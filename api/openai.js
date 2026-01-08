import { handleOpenAIRewrite } from './controllers/openaiController.js';

// Simple in-memory rate limiting for serverless
// NOTE: This resets whenever the function instance restarts
const requests = new Map();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

function rateLimit(ip) {
  const now = Date.now();
  const data = requests.get(ip) || { count: 0, startTime: now };

  if (now - data.startTime > WINDOW_MS) {
    // Reset window
    data.count = 1;
    data.startTime = now;
  } else {
    data.count += 1;
  }

  requests.set(ip, data);

  if (data.count > MAX_REQUESTS) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - data.startTime)) / 1000);
    const error = new Error('Too many requests. Please try again later.');
    error.status = 429;
    error.retryAfter = retryAfter;
    throw error;
  }
}

export default async function handler(req, res) {
  // ----------------------
  // 1️⃣ CORS Headers
  // ----------------------
  res.setHeader('Access-Control-Allow-Origin', 'https://mannyras.com'); // your frontend
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // ----------------------
  // 2️⃣ Rate limiting
  // ----------------------
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    rateLimit(ip);
  } catch (err) {
    return res
      .status(err.status || 429)
      .setHeader('Retry-After', err.retryAfter || 60)
      .json({ error: err.message });
  }

  // ----------------------
  // 3️⃣ Call OpenAI controller
  // ----------------------
  try {
    await handleOpenAIRewrite(req, res);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
