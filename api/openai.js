import rateLimit from 'express-rate-limit';
import { handleOpenAIRewrite } from './controllers/openaiController.js';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 requests per IP
  message: {
    error: 'Too many rewrite requests from this IP. Please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Convert Express middleware to a promise
const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });

// Vercel API Route
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Apply rate limiting
    await runMiddleware(req, res, limiter);

    // Call the actual handler
    await handleOpenAIRewrite(req, res);
  } catch (error) {
    if (error?.message?.includes('Too many')) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
