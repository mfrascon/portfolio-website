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

// Promisify middleware (needed for Vercel)
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
  try {
    // ✅ ALWAYS apply CORS first
    await runMiddleware(req, res, corsMiddleware);

    // ✅ Handle preflight requests immediately
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // ✅ Only allow POST
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // ✅ Apply rate limiting
    await runMiddleware(req, res, limiter);

    // ✅ Call OpenAI controller
    return await handleOpenAIRewrite(req, res);
  } catch (error) {
    console.error('API Error:', error);

    // Handle rate-limit errors cleanly
    if (error?.status === 429) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
      });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}