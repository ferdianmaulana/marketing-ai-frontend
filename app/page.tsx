"use client";

import { useState, useRef, useEffect } from "react";
import chat_window from "@/components/chat_window";
import chat_input from "@/components/chat_input";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  tools_used?: string[];
  loading?: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your Marketing Analytics Agent. Ask me anything about your tracked YouTube channels — performance stats, top videos, competitor comparisons, or optimization suggestions.",
      tools_used: [],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const ChatWindow = chat_window;
  const ChatInput = chat_input;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(question: string) {
    if (!question.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
    };

    const loadingMsg: Message = {
      id: "loading",
      role: "assistant",
      content: "",
      loading: true,
    };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setLoading(true);

    // Build chat history excluding welcome and loading messages
    const history = messages
      .filter((m) => m.id !== "welcome" && !m.loading)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, chat_history: history }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer,
        tools_used: data.tools_used || [],
      };

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "loading"),
        assistantMsg,
      ]);
    } catch (err) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, I couldn't reach the backend. Please check if the API is running.",
        tools_used: [],
      };
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "loading"),
        errorMsg,
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-4 border-b border-gray-800 bg-gray-900">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
          M
        </div>
        <div>
          <h1 className="text-sm font-semibold text-white">
            Marketing AI Agent
          </h1>
          <p className="text-xs text-gray-400">
            YouTube channel analytics · Powered by LLM + LangChain
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-gray-400">Live</span>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <ChatWindow messages={messages} />
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 bg-gray-900 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSend={handleSend} loading={loading} />
          <p className="text-xs text-gray-600 mt-2 text-center">
            Try: &quot;What channels are tracked?&quot; · &quot;Show top videos
            for [channel]&quot; · &quot;Compare [A] vs [B]&quot;
          </p>
        </div>
      </div>
    </main>
  );
}
