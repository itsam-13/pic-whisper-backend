const { GoogleGenAI } = require('@google/genai');

// Initializes the client. It automatically picks up process.env.GEMINI_API_KEY from your .env file.
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
    try {
        const contents = [
            "Caption this image.",
            {
                inlineData: {
                    data: base64ImageFile,
                    mimeType: "image/jpeg"
                }
            }
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                systemInstruction: `
        You are an expert AI copywriter. Your sole task is to analyze the provided image and generate exactly one short, punchy, one-line caption.
        
        CRITICAL RULES:
        1. Keep the caption strictly under 15 words.
        2. Deliver the entire response on a single line.
        3. Naturally integrate 1-2 relevant emojis and exactly 1-3 targeted hashtags at the end.
        4. Do not include introductory text like "Here is your caption:".
    `
            }
        });

        return response.text;

    } catch (error) {
        console.error("Error generating image caption:", error);
        throw error;
    }
}

module.exports = { generateCaption };