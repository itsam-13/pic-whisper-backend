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
            contents: contents
        });

        return response.text;

    } catch (error) {
        console.error("Error generating image caption:", error);
        throw error; 
    }
}

module.exports = { generateCaption };