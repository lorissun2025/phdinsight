
import { GoogleGenAI, Type } from "@google/genai";
import { UserPersona } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMarketInsights = async (persona: UserPersona, contextData: any) => {
  const model = 'gemini-3-flash-preview';
  
  const systemInstructions = `
    You are an expert pharmaceutical data analyst. Analyze the provided national healthcare data 
    (sales, distribution, prescription, patient) for the specific user: ${persona}.
    Generate 3-4 professional insights focusing on market opportunities, competitive risks, or regulatory compliance.
    Provide the response in structured JSON format.
  `;

  const prompt = `
    Based on the following context data, provide strategic insights:
    ${JSON.stringify(contextData)}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: systemInstructions,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              impact: { type: Type.STRING }
            },
            required: ["title", "content", "confidence", "impact"]
          }
        }
      }
    });

    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};

export const getAIPrediction = async (historicalData: any) => {
  const model = 'gemini-3-pro-preview';
  const prompt = `
    Analyze this historical drug sales data and predict the next 6 months trend. 
    Consider seasonality and market volatility.
    Data: ${JSON.stringify(historicalData)}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate prediction at this time.";
  }
};
