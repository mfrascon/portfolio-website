import rateLimit from 'express-rate-limit';
import { handleOpenAIRewrite } from '../controllers/openaiController.js';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });

export default async function handler(req, res) {
  /* 🔥 SET CORS HEADERS MANUALLY — REQUIRED FOR VERCEL */
  res.setHeader('Access-Control-Allow-Origin', 'https://www.mannyras.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  // ✅ Preflight must return immediately
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await runMiddleware(req, res, limiter);
    return await handleOpenAIRewrite(req, res);
  } catch (error) {
    console.error('API Error:', error);

    if (error?.status === 429) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
      });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
