import rateLimit from 'express-rate-limit';
import { handleOpenAIRewrite } from './controllers/openaiController.js';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

// Helper to run middleware
const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) reject(result);
      resolve(result);
    });
  });

export default async function handler(req, res) {
  // ✅ CORS HEADERS (CRITICAL)
  res.setHeader('Access-Control-Allow-Origin', 'https://mannyras.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
