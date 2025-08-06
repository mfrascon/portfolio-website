import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This should be set in Vercel dashboard
});

export const handleOpenAIRewrite = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You rewrite short user messages to sound polite, professional, and clear."
        },
        {
          role: "user",
          content: `Rewrite this message:\n\n"${message}"`
        }
      ],
      temperature: 0.7,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const reply = completion.choices?.[0]?.message?.content;

    return res.status(200).json({ rewrittenMessage: reply });
  } catch (error) {
    console.error("OpenAI error:", error);

    // Include more debug info in development mode only
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).json({ error: error.message || "OpenAI API error" });
    }

    return res.status(500).json({ error: "Failed to contact OpenAI API" });
  }
};