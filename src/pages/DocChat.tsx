
"use client";

import { useState, useRef, useEffect } from "react";
import { fetchGeminiResponse } from "../utils/fetchGeminiResponse.js";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Clipboard, Loader } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  text: string;
  sender: "user" | "bot";
}

export default function DocChat() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to the bottom of the messages whenever a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "44px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (input.trim() === "") return;
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Add user message to the chat history
    const userMessage: Message = { text: input, sender: "user" };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // Clear input
    setInput(""); 

    // Set loading state to true while waiting for response
    setIsLoading(true);

    try {
      // Call Google Generative AI API with user input and conversation history
      const botResponse = await fetchGeminiResponse(input, updatedMessages, apiKey);

      // Add bot response to the chat history
      const botMessage: Message = { text: botResponse, sender: "bot" };
      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      toast.error("Failed to get a response. Please try again later.");
      console.error("Error fetching response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <PageTransition>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-card shadow-lg border border-border"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                <h1 className="text-2xl font-bold">{t("docchat.title")}</h1>
              </div>
              <div className="text-sm text-muted-foreground">
                AI Assistant
              </div>
            </div>

            {/* Chat messages container */}
            <div className="h-[500px] overflow-y-auto mb-6 rounded-lg bg-background p-4 border border-border">
              <AnimatePresence>
                {messages.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center gap-4 text-muted-foreground"
                  >
                    <p className="text-lg font-medium">{t("docchat.welcome")}</p>
                    <p>{t("docchat.prompt")}</p>
                  </motion.div>
                ) : (
                  <div className="space-y-5">
                    {messages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "flex",
                          msg.sender === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div 
                          className={cn(
                            "rounded-xl p-4 max-w-[80%]",
                            msg.sender === "user" 
                              ? "bg-primary text-primary-foreground rounded-tr-none" 
                              : "bg-muted rounded-tl-none"
                          )}
                        >
                          {msg.sender === "bot" ? (
                            <div className="space-y-3">
                              <div className="whitespace-pre-wrap break-words text-sm">
                                {msg.text}
                              </div>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-7 px-2" 
                                    onClick={() => handleCopy(msg.text)}
                                  >
                                    <Clipboard className="h-3.5 w-3.5 mr-1" />
                                    <span className="text-xs">{t("docchat.copy")}</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{t("docchat.copy")}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          ) : (
                            <p className="text-sm">{msg.text}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-muted rounded-xl rounded-tl-none p-4 max-w-[80%]">
                          <div className="flex items-center gap-2">
                            <Loader className="h-4 w-4 animate-spin" />
                            <span className="text-sm">{t("docchat.thinking")}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Input area */}
            <div className="relative">
              <textarea
                ref={inputRef}
                className="w-full bg-muted/50 min-h-[44px] max-h-[200px] rounded-xl px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={t("docchat.placeholder")}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                rows={1}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || input.trim() === ""}
                className="absolute right-2 bottom-1.5 h-8 w-8 p-0 rounded-lg"
                variant={input.trim() === "" ? "ghost" : "default"}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-3 text-xs text-center text-muted-foreground">
              <p>{t("docchat.poweredby")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
