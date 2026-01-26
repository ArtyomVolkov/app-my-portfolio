import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const MODELS = {
  textGeneration: "gpt-4o",
  imageGeneration: "dall-e-3",
  audioProcessing: "whisper-1",
};

const getModels = async () => {
  try {
    const data = await openai.models.list();
    console.log(data);
  } catch (error) {
    console.error("Error fetching models:", error);
    return;
  }
};

export { openai, getModels };
