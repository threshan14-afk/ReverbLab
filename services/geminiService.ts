
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI SDK with direct access to process.env.API_KEY.
// Using the named parameter as required by the latest SDK guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface SynthesisResult {
  text: string;
  sources: GroundingSource[];
}

/**
 * Synthesizes a music concept based on a user prompt.
 * Uses Google Search grounding to provide accurate track recommendations and atmosphere details.
 */
export async function synthesizeMusicConcept(userPrompt: string): Promise<SynthesisResult> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User wants to synthesize a music concept: ${userPrompt}. Provide a deep, artistic breakdown including track recommendations, atmosphere details, and technical edit suggestions (like reverb types and EQ curves). Be poetic and professional.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    // Extract grounding sources as required when using Google Search.
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = groundingChunks
      ?.filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web?.title || 'Source',
        uri: chunk.web?.uri || ''
      })) || [];

    // Access the response text via the .text property.
    return {
      text: response.text || "Connection to the frequency lost. Try again.",
      sources: sources
    };
  } catch (error) {
    console.error("Gemini Music Lab Error:", error);
    throw error;
  }
}

/**
 * Starts a new chat session using the Gemini 3 Pro model for complex conversational tasks.
 */
export async function startChatSession() {
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: "You are the ReverbLab AI Assistant, created by Threshan. You are poetic, calm, and deeply knowledgeable about 'slowed + reverb' culture, ambient music, and Cyber-Zen aesthetics. You help users navigate their emotions through sound. Keep responses concise but immersive.",
    }
  });
}

/**
 * Edits an image based on a text prompt using the gemini-2.5-flash-image model.
 * This fixes the missing export error in ImageEditor.tsx.
 */
export async function editImageWithGemini(imageDataUrl: string, prompt: string): Promise<string | null> {
  try {
    // Extract base64 and mimeType from data URL (e.g., data:image/png;base64,iVBOR...)
    const [header, base64Data] = imageDataUrl.split(',');
    const mimeType = header.match(/:(.*?);/)?.[1] || 'image/png';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    // Iterate through response parts to locate the generated/edited image data.
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          const returnedMimeType = part.inlineData.mimeType || 'image/png';
          return `data:${returnedMimeType};base64,${base64EncodeString}`;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Gemini Image Edit Error:", error);
    throw error;
  }
}
