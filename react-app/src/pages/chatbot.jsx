import React, { useState, useRef, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { sendChatMessage } from "../services/api";
import "../styles/chatbot.css";

const LANG_SUGGESTIONS = {
  English: [
    "Teach me common English idioms",
    "Help me with English grammar",
    "Practice English conversation with me",
    "Teach me formal vs informal English",
  ],
  Spanish: [
    "Teach me basic Spanish greetings 🇪🇸",
    "How do I count in Spanish?",
    "Common Spanish phrases for travel",
    "Teach me Spanish verb conjugations",
  ],
  French: [
    "Teach me basic French greetings 🇫🇷",
    "How do I introduce myself in French?",
    "Common French phrases for daily life",
    "Teach me French pronunciation",
  ],
  German: [
    "Teach me basic German greetings 🇩🇪",
    "How do I count in German?",
    "Common German phrases for travel",
    "Teach me German articles (der/die/das)",
  ],
  Japanese: [
    "Teach me basic Japanese greetings 🇯🇵",
    "Teach me Hiragana basics",
    "Common Japanese phrases for daily life",
    "How do I introduce myself in Japanese?",
  ],
  Korean: [
    "Teach me basic Korean greetings 🇰🇷",
    "Teach me Hangul basics",
    "Common Korean phrases for travel",
    "How do I say 'thank you' in Korean?",
  ],
  Chinese: [
    "Teach me basic Mandarin greetings 🇨🇳",
    "How do I count in Chinese?",
    "Common Chinese phrases for daily life",
    "Teach me Chinese tones",
  ],
  default: [
    "Teach me basic greetings",
    "How do I introduce myself?",
    "Common phrases for traveling",
    "Help me with grammar basics",
  ],
};

/* Light formatting: **bold**, bullet lines, newlines */
function formatBotText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^[-•]\s+(.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
    .replace(/\n/g, "<br />");
}

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);
  const language = localStorage.getItem("selectedLanguage") || "English";

  // Set initial message based on language
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: `Hi 👋 I'm your AI Language Tutor! I see you're learning **${language}**. I can teach you vocabulary, grammar, phrases, and have practice conversations. What would you like to learn today?`
      }
    ]);
  }, [language]);

  const suggestions = LANG_SUGGESTIONS[language] || LANG_SUGGESTIONS.default;

  const send = async (overrideMessage) => {
    const userMessage = (overrideMessage || input).trim();
    if (!userMessage || loading) return;
    setInput("");

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Pass conversation history for context
      const reply = await sendChatMessage(userMessage, language, messages);
      setMessages(prev => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: `⚠️ ${err.message || "Could not reach the AI server."}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      { sender: "bot", text: `Chat cleared! Ready to continue your **${language}** lessons. What would you like to learn?` }
    ]);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const showSuggestions = messages.length <= 1 && !loading;

  return (
    <DashboardLayout>
      <div className="chat-wrapper">
        <div className="chat-header-bar">
          <div className="chat-header-left">
            <span className="chat-header-icon">🤖</span>
            <div>
              <h2>AI Language Tutor</h2>
              <span className="chat-lang-tag">{language}</span>
            </div>
          </div>
          <button className="clear-btn" onClick={clearChat} title="Clear chat">
            🗑️ Clear
          </button>
        </div>

        <div className="chat-card">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`msg ${m.sender}`}
                {...(m.sender === "bot" ? { dangerouslySetInnerHTML: { __html: formatBotText(m.text) } } : { children: m.text })}
              />
            ))}

            {showSuggestions && (
              <div className="suggestions">
                {suggestions.map((s) => (
                  <button key={s} className="chip" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="msg bot typing-indicator">
                <span /><span /><span />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={loading ? "Waiting for AI..." : `Ask me anything about ${language}...`}
              onKeyDown={(e) => e.key === "Enter" && send()}
              disabled={loading}
            />
            <button onClick={() => send()} disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Chatbot;
