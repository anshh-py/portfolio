import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Trash2, X } from "lucide-react";
import { answerFor, matchIntent, suggestedQuestions } from "../data/knowledgeBase";

const GREETING = {
  role: "assistant",
  text: "Hi, I'm Ask Ansh — a friendly assistant that answers questions about Ansh's background, projects, skills and research. What would you like to know?",
};

export default function AskAnsh() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const lastTopicRef = useRef(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing, open]);

  function send(text) {
    const q = text.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    const entry = matchIntent(q, lastTopicRef.current);
    lastTopicRef.current = entry || lastTopicRef.current;
    const reply = answerFor(q, lastTopicRef.current);
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
      setTyping(false);
    }, 600);
  }

  function clearConversation() {
    setMessages([GREETING]);
    setTyping(false);
    lastTopicRef.current = null;
  }

  function toggle() {
    setOpen((v) => !v);
  }

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Close Ask Ansh" : "Open Ask Ansh"}
        className={`fixed bottom-5 right-5 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors ${
          open ? "bg-ink text-paper" : "bg-accent text-paper hover:bg-ink"
        }`}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-4 z-[70] flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-2xl transition-all duration-300 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
        style={{ maxHeight: "min(32rem, calc(100vh - 8rem))" }}
        role="dialog"
        aria-label="Ask Ansh chat"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line bg-white/60 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent font-serif text-sm font-semibold text-paper">
              A
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">Ask Ansh</p>
              <p className="text-xs text-muted">Frequently asked about Ansh's work</p>
            </div>
          </div>
          <button
            type="button"
            onClick={clearConversation}
            aria-label="Clear conversation"
            title="Clear conversation"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-accentsoft/60 hover:text-accent"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4" style={{ minHeight: "12rem" }}>
          <div className="space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-accent text-paper rounded-br-md"
                      : "bg-accentsoft/60 text-ink rounded-bl-md"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-accentsoft/60 px-4 py-3">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Suggested questions */}
        {messages.length <= 1 && !typing && (
          <div className="flex flex-wrap gap-2 border-t border-line px-4 pb-2 pt-3">
            {suggestedQuestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Composer */}
        <form
          className="flex items-center gap-2 border-t border-line px-4 py-3"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <label htmlFor="ask-input" className="sr-only">
            Ask a question
          </label>
          <input
            id="ask-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Ansh…"
            className="h-11 flex-1 rounded-full border border-line bg-white/70 px-4 text-sm text-ink outline-none transition-colors focus:border-accent"
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            aria-label="Send"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-paper transition-colors hover:bg-ink disabled:opacity-40 disabled:hover:bg-accent"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
