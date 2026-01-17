
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "Mountain View RV Assistant". 
Your role is to help guests plan their stay at Mountain View RV Park in Van Horn, TX.
You can provide information about:
1. Park amenities (Wi-Fi, laundry, full hookups, pet-friendly policy).
2. Nearby attractions (Guadalupe Mountains National Park, McDonald Observatory, Marfa, Pratt Lodge).
3. Travel tips for RV owners traveling through West Texas.
4. Weather-related advice for high desert regions (cool nights, warm days).
5. Local dining recommendations in Van Horn (Chuy's Restaurant - Elvis shrine, Van Horn Cattle Co).

Be friendly, professional, and outdoors-focused. If asked about rates, refer them to the website's rates section (Daily $45, Weekly $250, Monthly $650).
Our location is Van Horn, TX, the gateway to the West Texas mountains.
`;

export async function getAssistantResponse(prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that. How else can I help you today?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The assistant is currently taking a break. Please try again in a few moments.";
  }
}
