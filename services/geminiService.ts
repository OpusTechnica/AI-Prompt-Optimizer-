import { GoogleGenAI } from "@google/genai";
import { OptimizationStyle } from '../types';

// Initialize with an empty string to prevent a crash if the env var is missing on load.
// The key is checked at runtime in App.tsx before any API call.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `You are Prompt Perfect, an expert prompt engineer. Your role is to refine and optimize user-provided prompts to be more effective for large language models.
- Analyze the user's original prompt and their desired optimization style.
- Rewrite the prompt to be clearer, more specific, and better structured for an AI.
- Crucially, the rewritten prompt should be comprehensive and detailed to elicit a high-quality response from another AI. For styles like 'More Detailed', 'Creative', or 'App Dev', be particularly expansive. Add context, examples, constraints, or formatting instructions. The only exception is the 'More Concise' style, where brevity is the goal.
- Structure your response using a clean, professional formatting hierarchy. Use ## for major sections and ### for subsections. Use standard bullet points (-) or numbered lists for clarity.
- Use formatting sparingly. Apply bolding to only 2-3 key terms per section and use italics for subtle emphasis. Avoid bolding every title and subtitle.
- Use code blocks (\`) for technical terms, filenames, or code snippets when relevant.
- Exercise restraint: Avoid emojis in headers and the overuse of multiple formatting styles on the same text. Use clean, minimal formatting with strategic emphasis only where truly needed.
- Do NOT answer or fulfill the user's prompt. Your only output should be the rewritten, optimized prompt itself.
- Ensure the output is only the prompt text, without any conversational preamble or explanation.`;

export const optimizePrompt = async (prompt: string, style: OptimizationStyle): Promise<string> => {
  try {
    const userPrompt = `Optimization Style: "${style}"\n\nOriginal Prompt: "${prompt}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      }
    });
    
    return response.text.trim();

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    if (error instanceof Error) {
        const lowerCaseMessage = error.message.toLowerCase();
        if (lowerCaseMessage.includes('api key not valid')) {
            throw new Error("The API key is invalid. Please check your configuration.");
        }
        if (lowerCaseMessage.includes('permission denied')) {
            throw new Error("Permission denied. Your API key might not have the required permissions.");
        }
        if (lowerCaseMessage.includes('quota')) {
            throw new Error("API quota exceeded. Please check your usage and limits.");
        }
    }
    
    // Fallback for other errors (network issues, server errors, etc.)
    throw new Error("An unexpected error occurred while contacting the AI service.");
  }
};