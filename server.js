const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: userMessage }],
    });
    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "OpenAI API error", details: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Jeremy GPT server is running.");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
