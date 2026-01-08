import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { handleOpenAIRewrite } from './controllers/openaiController.js';

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

// Promisify middleware
const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });

// CORS middleware
const corsMiddleware = cors({
  origin: 'https://mannyras.com',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
});

export default async function handler(req, res) {
  // ✅ Handle CORS FIRST
  await runMiddleware(req, res, corsMiddleware);

  // ✅ Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await runMiddleware(req, res, limiter);
    await handleOpenAIRewrite(req, res);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}