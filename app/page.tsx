"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-screen bg-white dark:bg-zinc-950">
      <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          SQL Assistant
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Ask questions about your database in natural language
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-zinc-400 dark:text-zinc-600 mt-20">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-lg">
              Start by asking a question about your data
            </p>
            <p className="text-sm mt-2">
              Example: "How many products do we have in stock?"
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                  : "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
              }`}
            >
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div
                        key={`${message.id}-${i}`}
                        className="whitespace-pre-wrap"
                      >
                        {part.text}
                      </div>
                    );

                  case "tool-call":
                    if ("toolName" in part && part.toolName === "db") {
                      return (
                        <div
                          key={`${message.id}-${i}`}
                          className="mt-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3"
                        >
                          <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            <span>⚡</span>
                            <span>Running query...</span>
                          </div>
                          <code className="text-xs text-zinc-600 dark:text-zinc-400 block font-mono">
                            {"args" in part
                              ? (part.args as { query: string }).query
                              : "Loading..."}
                          </code>
                        </div>
                      );
                    }
                    if ("toolName" in part && part.toolName === "schema") {
                      return (
                        <div
                          key={`${message.id}-${i}`}
                          className="mt-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3"
                        >
                          <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            <span>📋</span>
                            <span>Fetching schema...</span>
                          </div>
                        </div>
                      );
                    }
                    break;

                  case "tool-result":
                    if (
                      "toolName" in part &&
                      part.toolName === "db" &&
                      "result" in part
                    ) {
                      const { result, error } = part.result as {
                        result?: any;
                        error?: string;
                      };

                      if (error) {
                        return (
                          <div
                            key={`${message.id}-${i}`}
                            className="mt-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-3"
                          >
                            <div className="text-sm font-medium text-red-700 dark:text-red-400">
                              ❌ Error
                            </div>
                            <div className="text-xs text-red-600 dark:text-red-500 mt-1">
                              {error}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={`${message.id}-${i}`}
                          className="mt-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 overflow-x-auto"
                        >
                          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                            ✓ Results
                          </div>
                          <pre className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                            {JSON.stringify(result, null, 2)}
                          </pre>
                        </div>
                      );
                    }

                    if (
                      "toolName" in part &&
                      part.toolName === "schema" &&
                      "result" in part
                    ) {
                      const schemaResult = part.result as { result?: string };
                      return (
                        <div
                          key={`${message.id}-${i}`}
                          className="mt-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 overflow-x-auto"
                        >
                          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                            Database Schema
                          </div>
                          <pre className="text-xs text-zinc-600 dark:text-zinc-400 font-mono whitespace-pre-wrap">
                            {schemaResult?.result || "No schema available"}
                          </pre>
                        </div>
                      );
                    }
                    break;

                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim() || isLoading) return;
            sendMessage({ text: input });
            setInput("");
          }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              placeholder="Ask about your database..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 disabled:opacity-50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
