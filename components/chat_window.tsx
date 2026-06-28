import { Message } from "@/app/page";
import tool_badge from "@/components/tool_badge";
import ReactMarkdown from "react-markdown";

const ToolBadge = tool_badge;

type Props = {
  messages: Message[];
};

export default function chat_window({ messages }: Props) {
  return (
    <>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          {msg.role === "assistant" && (
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white mr-2 mt-1 flex-shrink-0">
              AI
            </div>
          )}

          <div
            className={`max-w-[80%] ${msg.role === "user" ? "order-1" : ""}`}
          >
            {/* Bubble */}
            <div
              className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-sm"
                  : "bg-gray-800 text-gray-100 rounded-tl-sm"
              }`}
            >
              {msg.loading ? (
                <span className="flex gap-1 items-center h-5">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </span>
              ) : msg.role === "assistant" ? (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="text-gray-200">{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                    code: ({ children }) => <code className="bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono text-indigo-300">{children}</code>,
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>

            {/* Tool badges */}
            {msg.tools_used && msg.tools_used.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1.5 ml-1">
                {msg.tools_used.map((tool) => (
                  <ToolBadge key={tool} tool={tool} />
                ))}
              </div>
            )}
          </div>

          {msg.role === "user" && (
            <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-300 ml-2 mt-1 flex-shrink-0">
              U
            </div>
          )}
        </div>
      ))}
    </>
  );
}
