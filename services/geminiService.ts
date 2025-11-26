import { GoogleGenAI } from "@google/genai";
import { Invoice } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeInvoiceImage = async (base64Image: string): Promise<Partial<Invoice>> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Clean base64 string if it has the data prefix
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const prompt = `
      Analyze this image of an invoice. Extract the following details into a JSON object:
      - invoiceNumber (string)
      - supplierName (string)
      - date (string, YYYY-MM-DD format)
      - subtotal (number, the net amount before tax)
      - taxAmount (number, the VAT/IVA amount)
      - total (number, the final total)
      - items (array of objects with description, quantity, unitPrice, total)

      If you cannot find specific line items, try to estimate them or provide a single item with the description "Various Services".
      Ensure numbers are raw numbers (no currency symbols).
      Return ONLY valid JSON.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    // Parse JSON
    const data = JSON.parse(text);

    return {
      invoiceNumber: data.invoiceNumber || 'Unknown',
      supplierName: data.supplierName || 'Unknown Supplier',
      date: data.date || new Date().toISOString().split('T')[0],
      subtotal: data.subtotal || 0,
      taxAmount: data.taxAmount || 0,
      total: data.total || 0,
      items: data.items || [],
      status: 'Draft'
    };

  } catch (error) {
    console.error("Gemini Vision API Error:", error);
    throw new Error("Failed to analyze invoice.");
  }
};