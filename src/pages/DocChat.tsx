
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const DocChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Dr. AI, your virtual healthcare assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on your symptoms, it sounds like you might have a common cold. Rest, stay hydrated, and take over-the-counter cold medications if needed.",
        "I understand your concern. This could be related to seasonal allergies. Have you tried any antihistamines?",
        "Your symptoms could be indicative of several conditions. It would be best to consult with a healthcare provider for a proper diagnosis.",
        "That's good to know. Have you noticed any other symptoms or changes recently?",
        "I recommend monitoring your symptoms for the next 24-48 hours. If they worsen or new symptoms appear, please seek medical attention.",
        "This might be a mild viral infection. Rest and hydration are key. If symptoms persist for more than 5 days, please consult a doctor.",
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const newAiMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newAiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
              <MessageCircle size={20} className="mr-2" />
              <span className="font-medium">Doc Chat</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Chat with Our AI Doctor</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get instant medical advice and consultations through our AI-powered virtual doctor. Available 24/7 to address your health concerns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-3xl overflow-hidden shadow-lg border border-muted">
              {/* Chat Header */}
              <div className="bg-primary/5 p-4 border-b border-border flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <MessageCircle size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dr. AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Online | Responding in seconds</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" aria-label="Search chat history">
                  <Search size={18} />
                </Button>
              </div>

              {/* Chat Messages */}
              <div className="p-4 h-[50vh] overflow-y-auto bg-muted/20">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex mb-4 ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.sender === "ai" && (
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mr-2">
                          <MessageCircle size={16} className="text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] p-4 rounded-xl ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted rounded-tl-none"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <span
                          className={`text-xs mt-1 block ${
                            message.sender === "user"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start mb-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mr-2">
                        <MessageCircle size={16} className="text-primary" />
                      </div>
                      <div className="bg-muted p-4 rounded-xl rounded-tl-none">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "200ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "400ms" }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </AnimatePresence>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none h-12 min-h-[48px]"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={inputMessage.trim() === "" || isLoading}
                    className="ml-2 rounded-xl"
                  >
                    <Send size={18} />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  This is a simulated AI chat for demonstration purposes. Not a substitute for professional medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about our virtual doctor consultation service
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <FaqItem
              question="How accurate is the AI doctor?"
              answer="Our AI doctor is trained on a vast database of medical knowledge and continuously updated with the latest research. While it can provide helpful guidance, it's not a replacement for in-person medical care from a human doctor."
            />
            <FaqItem
              question="Is my conversation private and secure?"
              answer="Yes, all conversations with our AI doctor are encrypted and stored securely. We prioritize your privacy and comply with healthcare data protection standards."
            />
            <FaqItem
              question="Can I get prescriptions through this service?"
              answer="No, our AI doctor cannot prescribe medications. It can provide information about common treatments, but for prescriptions, you'll need to consult with a licensed healthcare provider."
            />
            <FaqItem
              question="What types of health issues can I discuss?"
              answer="You can discuss a wide range of health concerns, from common illnesses to general wellness questions. The AI is designed to provide information and guidance for many health topics."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-xl overflow-hidden shadow-sm border border-muted"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 flex justify-between items-center"
      >
        <h3 className="font-medium">{question}</h3>
        <div
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 pt-0 border-t border-border">
              <p className="text-muted-foreground">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DocChat;
