const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config();
if (!process.env.OPENROUTER_API_KEY) {
  console.error("ERROR: OPENROUTER_API_KEY is not set in .env");
  process.exit(1);
}

const app = express();

app.use(
  cors({
    origin: /^http:\/\/localhost(:\d+)?$/,
    methods: ["GET", "POST"],
  })
);

app.use(express.json({ limit: "16kb" }));

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-3.5-turbo";
const MAX_MESSAGE_LENGTH = 2000;

const SYSTEM_PROMPT = `You are LEARNEX AI Tutor — an expert, friendly language teacher who can teach ANY language in the world.

CORE BEHAVIOR:
- When a user says they want to learn a language (e.g. "teach me Spanish", "I want to learn Japanese"), immediately start teaching them that language
- Start with basics: greetings, common phrases, numbers, simple sentences
- Present vocabulary in a structured way: **word/phrase** — pronunciation — meaning
- Give example sentences using new vocabulary
- After teaching a concept, quiz the user with a quick exercise
- Adapt difficulty based on the conversation — start easy, gradually increase complexity
- Use the target language alongside English translations
- Correct mistakes gently and explain why

TEACHING STRUCTURE:
When teaching a new topic, follow this format:
1. Introduce the topic (e.g. "Let's learn basic greetings in Spanish! 🇪🇸")
2. Present 3-5 key words/phrases with pronunciation
3. Show example dialogues using those phrases
4. Give a mini exercise (e.g. "How would you say 'Good morning' in Spanish?")

LANGUAGE CAPABILITIES:
You can teach: Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese (Mandarin), Arabic, Hindi, Russian, Turkish, Dutch, Swedish, Polish, Greek, Thai, Vietnamese, Indonesian, and any other language the user requests.

FORMATTING:
- Use **bold** for key vocabulary words
- Use bullet points for lists
- Keep responses concise but educational
- Include emojis for the country flags when relevant
- Add pronunciation guides in parentheses for non-Latin scripts

If the user asks something outside language learning, gently redirect them back to learning.`;

/* Simple in-memory rate limiter — 60 requests per IP per minute */
const rateMap = new Map();
const RATE_WINDOW = 60_000;
const RATE_MAX = 60;

function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const entry = rateMap.get(ip) || { count: 0, start: now };

  if (now - entry.start > RATE_WINDOW) {
    entry.count = 1;
    entry.start = now;
  } else {
    entry.count++;
  }

  rateMap.set(ip, entry);

  if (entry.count > RATE_MAX) {
    return res.status(429).json({ error: "Too many requests. Please wait a moment." });
  }
  next();
}

/* Cleanup stale rate-limit entries every 5 minutes */
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateMap) {
    if (now - entry.start > RATE_WINDOW * 2) rateMap.delete(ip);
  }
}, 5 * 60_000);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "LEARNEX AI server is running." });
});

app.post("/chat", rateLimit, async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string" || message.trim() === "") {
      return res
        .status(400)
        .json({ error: "Message is required and must be a non-empty string." });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res
        .status(400)
        .json({ error: `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters.` });
    }

    // Build messages array with conversation history for context
    const messages = [{ role: "system", content: SYSTEM_PROMPT }];

    // Include last 10 messages of history for context
    if (Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (const h of recentHistory) {
        if (h.role && h.content && typeof h.content === "string") {
          messages.push({ role: h.role, content: h.content.substring(0, MAX_MESSAGE_LENGTH) });
        }
      }
    }

    messages.push({ role: "user", content: message.trim() });

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "LEARNEX AI Tutor",
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
      }),
    });

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      console.error("[/chat] OpenRouter error:", response.status, errBody);

      if (response.status === 429) {
        return res
          .status(429)
          .json({ error: "Rate limit reached. Please try again in a moment." });
      }
      return res
        .status(response.status)
        .json({ error: errBody?.error?.message || "AI service error." });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: "Empty response from AI." });
    }

    res.json({ reply });
  } catch (error) {
    console.error("[/chat] Server error:", error.message || error);
    res
      .status(500)
      .json({ error: "AI service unavailable. Please try again later." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`LEARNEX server running on http://localhost:${PORT}`);
});
