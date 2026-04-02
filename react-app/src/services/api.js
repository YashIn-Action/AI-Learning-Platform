const API_BASE = "http://localhost:5000";

export const sendChatMessage = async (message, language, history = []) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
        // Convert chat history to OpenAI format for context
        const formattedHistory = history
            .filter(m => m.text && m.sender)
            .map(m => ({
                role: m.sender === "user" ? "user" : "assistant",
                content: m.text,
            }));

        const response = await fetch(`${API_BASE}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: `[User is learning ${language}] ${message}`,
                history: formattedHistory,
            }),
            signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            if (response.status === 429) {
                throw new Error("Rate limit reached. Please wait a moment and try again.");
            }
            if (response.status === 503 || response.status === 502) {
                throw new Error("AI service is temporarily unavailable. Please try again later.");
            }
            throw new Error(err.error || `Server error (${response.status})`);
        }

        const data = await response.json();
        return data.reply;
    } catch (error) {
        clearTimeout(timeout);
        if (error.name === "AbortError") {
            throw new Error("Request timed out. The AI is taking too long to respond.");
        }
        throw new Error(error.message || "Could not reach the AI server. Make sure the backend is running on port 5000.");
    }
};