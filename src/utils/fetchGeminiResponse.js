// src/app/utils/fetchGeminiResponse.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// // ✅ Move the key to a constant (to avoid `process` in client context)
// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// // You can also pass it as an argument to be safer
// const genAI = new GoogleGenerativeAI(apiKey);


export async function fetchGeminiResponse(userInput, conversationHistory = [], apiKey) {
  try {
    if (!apiKey) throw new Error("API key is missing");

    // Initialize the Generative AI client inside the function
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Format conversation history: model and user roles aligned with Gemini's chat standards
    const formattedHistory = conversationHistory
      .map((msg) => `${msg.sender === "user" ? "User" : "FharmaBot"}: ${msg.text}`)
      .join("\n");

    const prompt = `
You are a medical AI assistant named FharmaBot, trained to help rural and urban users by providing accurate, safe, and general over-the-counter medicine recommendations based on symptoms provided. 

🩺 Mission: Bridge healthcare access for underserved regions.

🧠 Rules:
- Recommend only 1-2 widely available OTC (over-the-counter) medicines.
- Mention home/natural remedies if appropriate.
- Do NOT suggest controlled substances or prescriptions.
- Keep responses short, safe, and easy to understand.
- Warn users to consult a doctor for chronic/serious conditions.
- Ask follow-up questions if symptoms are vague.

📚 Examples:
1. **User**: I have a bad headache since morning  
   **FharmaBot**: You can take Paracetamol (500mg). Drink plenty of water and rest. If it lasts more than 2 days, see a doctor.

2. **User**: I'm coughing a lot and my throat hurts  
   **FharmaBot**: Try Benadryl or a lozenge like Strepsils. Warm fluids help too. Visit a doctor if it lasts more than 3 days.

Now, continue the chat below.

Conversation History:
${formattedHistory}

New User Input: ${userInput}

Your Response (FharmaBot):
`;

    // Use the model to generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return "Sorry, there was an issue with processing your request. Please try again later.";
  }
}
