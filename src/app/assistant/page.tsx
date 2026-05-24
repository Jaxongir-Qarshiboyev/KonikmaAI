"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, ShieldCheck, Building2, Lock, FileText, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { icon: ShieldCheck, text: "Shubhali tranzaksiyani ko'rsam nima qilishim kerak?", label: "AML qoidalari" },
  { icon: Lock, text: "Bank siri qanday ma'lumotlarni o'z ichiga oladi?", label: "Bank Siri" },
  { icon: Building2, text: "Bosh ofis uchun kiyinish madaniyati (Dress Code) qanday?", label: "Dress Code" },
  { icon: FileText, text: "Xodimlar uchun qanday kredit imtiyozlari mavjud?", label: "Imtiyozlar" },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          type: "onboarding",
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.text || "Kechirasiz, javob olinmadi. Qayta urinib ko'ring.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "⚠️ Hozir ulanishda muammo bor. Iltimos, API kalitingiz .env.local faylida to'g'ri o'rnatilganligini tekshiring!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ height: "calc(100vh - 48px)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Sparkles size={20} color="var(--primary)" />
          <span style={{ fontSize: 14, color: "var(--primary)", fontWeight: 600 }}>NeoBank AI</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--foreground)", marginBottom: 4, letterSpacing: "-0.02em" }}>
          Bank Qoidalari Yordamchisi
        </h1>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)" }}>
          Komplayens, bank siri, xavfsizlik yoki ichki qoidalar bo'yicha savollaringizni bering.
        </p>
      </div>

      {/* Chat Area */}
      <div
        className="glass-card"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          padding: 0,
        }}
      >
        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {messages.length === 0 ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 20,
                    background: "var(--gradient-navy)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <Building2 size={32} color="var(--accent-light)" />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: "var(--foreground)" }}>
                  NeoBank O'zbekiston'ga Xush Kelibsiz
                </h3>
                <p style={{ fontSize: 15, color: "var(--muted-foreground)", maxWidth: 450 }}>
                  Men bankning raqamli yordamchisiman. Sizga qanday yordam bera olaman?
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, width: "100%", maxWidth: 650 }}>
                {quickPrompts.map((prompt) => {
                  const Icon = prompt.icon;
                  return (
                    <button
                      key={prompt.label}
                      onClick={() => sendMessage(prompt.text)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "16px",
                        borderRadius: 12,
                        border: "1px solid var(--border)",
                        background: "var(--background)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        textAlign: "left",
                        boxShadow: "var(--shadow-sm)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--primary-light)";
                        e.currentTarget.style.boxShadow = "var(--shadow-md)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                      }}
                    >
                      <div style={{ padding: 8, background: "var(--muted)", borderRadius: 8, color: "var(--primary-dark)" }}>
                        <Icon size={18} />
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}>
                        {prompt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    gap: 12,
                  }}
                >
                  {msg.role === "assistant" && (
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "var(--gradient-navy)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Building2 size={18} color="var(--accent-light)" />
                    </div>
                  )}
                  <div className={`chat-bubble ${msg.role}`}>
                    <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
                  </div>
                  {msg.role === "user" && (
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "var(--gradient-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <User size={18} color="white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div style={{ display: "flex", gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "var(--gradient-navy)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Building2 size={18} color="var(--accent-light)" />
                  </div>
                  <div className="chat-bubble assistant" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Loader2 size={16} className="animate-spin text-[var(--primary)]" />
                    <span className="text-[var(--muted-foreground)]">Ma'lumotlar tahlil qilinmoqda...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div
          style={{
            padding: "20px 24px",
            borderTop: "1px solid var(--border)",
            background: "var(--muted)",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Bank qoidalari, KYC/AML yoki tizimlar haqida so'rang..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "16px 20px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                fontSize: 15,
                outline: "none",
                transition: "all 0.2s",
                background: "var(--background)",
                color: "var(--foreground)",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--primary)";
                e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.02)";
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="btn-gradient"
              style={{
                padding: "16px 24px",
                opacity: !input.trim() || isLoading ? 0.5 : 1,
                cursor: !input.trim() || isLoading ? "not-allowed" : "pointer",
                height: "54px",
              }}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
