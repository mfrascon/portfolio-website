import express from 'express';
import openaiRoutes from '../routes/openai.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/api/openai', openaiRoutes);

// Export the Express app as a Vercel serverless function
export default app;
