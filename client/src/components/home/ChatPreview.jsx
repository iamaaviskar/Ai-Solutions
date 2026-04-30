import { ArrowRight } from "lucide-react";

export default function ChatPreview({ messages }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#FAFAF7] overflow-hidden shadow-xl shadow-slate-200/80">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-1.5 ml-3">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] text-slate-400 font-medium">
            AI-Solutions Assistant - Online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="p-5 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2.5 items-start ${
              msg.from === "employee" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                msg.from === "employee"
                  ? "bg-slate-200 text-slate-600"
                  : "bg-amber-500 text-black"
              }`}
            >
              {msg.from === "employee" ? "JD" : "AI"}
            </div>

            <div
              className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                msg.from === "employee"
                  ? "bg-slate-100 text-slate-700 rounded-tr-sm"
                  : "bg-amber-50 border border-amber-200 text-slate-700 rounded-tl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-bold text-black">
            AI
          </div>
          <div className="flex gap-1 px-3.5 py-3 bg-amber-50 border border-amber-200 rounded-xl rounded-tl-sm">
            {[0, 150, 300].map((delay) => (
              <span
                key={delay}
                className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-slate-200 flex items-center gap-2 bg-white">
        <div className="flex-1 bg-slate-100 rounded-lg px-3 py-2 text-[12px] text-slate-400">
          Ask me anything about your digital workplace...
        </div>
        <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center">
          <ArrowRight size={13} className="text-black" />
        </div>
      </div>
    </div>
  );
}
