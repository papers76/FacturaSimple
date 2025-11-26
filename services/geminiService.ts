import { GoogleGenAI } from "@google/genai";
import { DashboardData } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateExecutiveSummary = async (data: DashboardData): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Prepare a concise context string from the data
    const metricsSummary = data.metrics.map(m => `${m.label}: ${m.value} (${m.change > 0 ? '+' : ''}${m.change}%)`).join(', ');
    const latestTransactions = data.transactions.slice(0, 3).map(t => `${t.user} paid ${t.amount} (${t.status})`).join(', ');
    
    const prompt = `
      You are an AI business analyst for a SaaS dashboard.
      Analyze the following current data snapshot:
      
      Key Metrics: ${metricsSummary}
      Recent Activity Sample: ${latestTransactions}
      
      Provide a concise, professional executive summary (max 3 sentences) highlighting performance, potential risks, or actionable insights. 
      Do not use markdown formatting like bolding or headers, just plain text suitable for a notification card.
      Tone: Professional, Insightful, Direct.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Unable to generate summary at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to fetch insights.");
  }
};