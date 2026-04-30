import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";

const SUGGESTED_PROMPTS = [
  "How would this assistant work for my team?",
  "Can this handle IT helpdesk queries?",
  "How quickly could you deploy this for us?",
];

function TypingIndicator() {
  return (
    <div className="flex gap-2.5 items-start">
      <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-bold text-black shrink-0">
        AI
      </div>
      <div className="flex gap-1 px-3.5 py-3 bg-amber-50 border border-amber-200 rounded-xl rounded-tl-sm">
        <span
          className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! I'm the AI-Solutions assistant. Ask me anything about our services, or how we can help your business.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", text: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setError(null);

    // Build history excluding the initial greeting (index 0) and the message we just added
    const history = updatedMessages.slice(1, -1).map((m) => ({
      role: m.role,
      text: m.text,
    }));

    try {
      const { data } = await api.post("/chat", {
        message: trimmed,
        history,
      });
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        "The AI assistant couldn't respond right now. Please try again in a moment.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const showSuggestions = messages.length === 1;

  return (
    <>
      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-5 z-50 w-90 max-w-[calc(100vw-2.5rem)] flex flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/50 transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ maxHeight: "520px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-[#FAFAF7] rounded-t-2xl shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black text-[11px] font-bold">
              AI
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0C0C0C] leading-none">
                AI-Solutions Assistant
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 items-start ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                  msg.role === "user"
                    ? "bg-slate-200 text-slate-600"
                    : "bg-amber-500 text-black"
                }`}
              >
                {msg.role === "user" ? "You" : "AI"}
              </div>
              <div
                className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-slate-100 text-slate-700 rounded-tr-sm"
                    : "bg-amber-50 border border-amber-200 text-slate-700 rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && <TypingIndicator />}

          {error && (
            <p className="text-center text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Suggested prompts */}
          {showSuggestions && !loading && (
            <div className="space-y-2 pt-1">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="w-full text-left text-[12px] text-slate-600 bg-slate-50 hover:bg-amber-50 hover:text-amber-700 border border-slate-200 hover:border-amber-200 rounded-lg px-3 py-2 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Contact nudge */}
        <div className="px-4 py-2 border-t border-slate-100 bg-[#FAFAF7] shrink-0">
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between text-[11px] text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            Have a specific project? Contact our team
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-slate-100 flex items-end gap-2 shrink-0">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // Auto-grow up to ~3 lines
              e.target.style.height = "auto";
              e.target.style.height =
                Math.min(e.target.scrollHeight, 72) + "px";
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything…"
            maxLength={500}
            disabled={loading}
            className="flex-1 resize-none bg-slate-100 rounded-xl px-3 py-2.5 text-[13px] text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-400/50 focus:bg-white border border-transparent focus:border-amber-200 transition-all disabled:opacity-50 leading-snug"
            style={{ minHeight: "40px", maxHeight: "72px" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0"
          >
            <Send size={14} className="text-black" />
          </button>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/30 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label="Toggle AI chat"
      >
        {open ? (
          <X size={20} className="text-black" />
        ) : (
          <Bot size={26} className="text-black" />
        )}
      </button>
    </>
  );
}
