"use client"; // Add this directive for client-side functionality

import { useState, useRef, useEffect } from "react";
import { fetchGeminiResponse } from "../utils/fetchGeminiResponse.js";
import { FiSend, FiClipboard } from 'react-icons/fi'; // Importing icons for send and copy

export default function ChatbotPage() {
  const [messages, setMessages] = useState([]); // Stores the conversation history
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to handle loading
  const messagesEndRef = useRef(null); // Reference to scroll to the latest message

  // Scroll to the bottom of the messages whenever a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    console.log("API Key:", apiKey); // Debugging line to ensure key is being fetched correctly

    // Add user message to the chat history
    const userMessage = { text: input, sender: "user" };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // Clear input
    setInput(""); 

    // Set loading state to true while waiting for response
    setIsLoading(true);

    // Call Google Generative AI API with user input and conversation history
    const botResponse = await fetchGeminiResponse(input, updatedMessages, apiKey);

    // Set loading state to false once the response is received
    setIsLoading(false);

    // Add bot response to the chat history
    const botMessage = { text: botResponse, sender: "bot" };
    setMessages([...updatedMessages, botMessage]);
  };

  const handleCopy = (text) => {
    // Create a temporary textarea to store the text
    const textarea = document.createElement("textarea");
    textarea.value = text; // Assign the exact text with formatting
    document.body.appendChild(textarea);

    // Select and copy the text
    textarea.select();
    document.execCommand("copy");

    // Remove the textarea
    document.body.removeChild(textarea);

    alert("Copied to clipboard!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-blue-500 to-blue-300 text-white rounded-lg shadow-lg">
      <div className="h-[600px] w-full overflow-y-auto mb-4 space-y-4">
        {/* Increased height and blue gradient background */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg max-w-full ${msg.sender === "user" ? "bg-blue-600 self-end text-right" : "bg-white text-gray-900"}`}
          >
            <strong className="block text-xs text-gray-400">{msg.sender === "user" ? "You" : "Bot"}</strong>
            {msg.sender === "bot" ? (
              <div>
                <pre className="bg-blue-800 p-4 rounded-md overflow-x-auto text-sm text-white whitespace-pre-wrap break-words">
                  <code>{` \n${msg.text}\n `}</code>
                </pre>
                {/* Copy button with an icon */}
                <button
                  onClick={() => handleCopy(msg.text)}
                  className="mt-2 text-sm text-gray-300 hover:text-white"
                >
                  <FiClipboard className="inline-block mr-2" /> Copy
                </button>
              </div>
            ) : (
              <p className="text-sm text-blue-200 break-words">{msg.text}</p>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="p-4 text-center text-gray-500">Loading...</div> // Display loading text or spinner
        )}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-600 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          <FiSend className="inline-block" />
        </button>
      </div>
    </div>
  );
}
