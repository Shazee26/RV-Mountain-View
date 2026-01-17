
import { GoogleGenAI } from "@google/genai";
import { GroundingSource } from "../types";

const SYSTEM_INSTRUCTION = `
You are the "Mountain View RV Assistant" for Mountain View RV Park in Van Horn, TX. 
Your primary goal is to help guests plan their stay and provide local information.

CAPABILITIES:
1. Real-time Weather: You have access to Google Search. ALWAYS search for current weather and short-term forecasts for Van Horn, TX when asked about climate or trip timing.
2. Park Info: Daily $45, Weekly $250, Monthly $650. Amenities include 30/50 amp full hookups, Wi-Fi, laundry, and pet areas.
3. Local Guide: Recommend Guadalupe Mountains NP, McDonald Observatory, and local eats like Chuy's or Van Horn Cattle Co.

STYLE:
Be welcoming, helpful, and outdoors-focused. If search results provide specific URLs, they will be extracted for the user automatically.
`;

export async function getAssistantResponse(prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    const text = response.text || "I'm sorry, I couldn't process that. How else can I help you today?";
    
    // Extract grounding chunks
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      });
    }

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      text: "The assistant is currently taking a break. Please try again in a few moments.",
      sources: []
    };
  }
}
