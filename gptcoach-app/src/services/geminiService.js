// src/services/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with your key
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export const evaluatePrompt = async (promptText) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        
        // Crafting instruction for Gemini to evaluate the prompt
        const instruction = `
        Evaluate the following ChatGPT prompt and categorize it based on its learning focus:
        
        Prompt: "${promptText}"
        
        Rate the prompt on a scale:
        0 - Simply fishing for answers without learning engagement
        1 - Mid-level attempt, somewhat focused on learning but could be improved
        2 - Good prompt that clearly demonstrates intent to learn
        
        Return only the numeric rating (0, 1, or 2) and a brief explanation.
        `;
        
        const result = await model.generateContent(instruction);
        const response = result.response.text();
        
        // Parse the response to extract the rating
        const ratingMatch = response.match(/^([0-2])/);
        const rating = ratingMatch ? parseInt(ratingMatch[1]) : 1;
        
        // Extract explanation (everything after the rating)
        const explanation = response.replace(/^[0-2]\s*[-:]*\s*/, '').trim();
        
        return {
            rating,
            explanation
        };
    } catch (error) {
        console.error("Error evaluating prompt with Gemini:", error);
        return {
            rating: 1,
            explanation: "Unable to evaluate the prompt at this time."
        };
    }
};
