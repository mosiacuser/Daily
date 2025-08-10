import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

if (!process.env.GOOGLE_API_KEY) {
  throw new Error('GOOGLE_API_KEY is not set');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Model configuration with environment variable support
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp';
const GEMINI_EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL || 'text-embedding-004';

console.log(`🤖 Using Gemini model: ${GEMINI_MODEL}`);
console.log(`🔗 Using embedding model: ${GEMINI_EMBEDDING_MODEL}`);

export const geminiModel = genAI.getGenerativeModel({ 
  model: GEMINI_MODEL,
  generationConfig: {
    temperature: parseFloat(process.env.GEMINI_TEMPERATURE || '0.7'),
    topP: parseFloat(process.env.GEMINI_TOP_P || '0.8'),
    topK: parseInt(process.env.GEMINI_TOP_K || '40'),
    maxOutputTokens: parseInt(process.env.GEMINI_MAX_TOKENS || '8192'),
  }
});

export const geminiEmbeddingModel = genAI.getGenerativeModel({ 
  model: GEMINI_EMBEDDING_MODEL
});

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const result = await geminiEmbeddingModel.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

export function getModelInfo() {
  return {
    mainModel: GEMINI_MODEL,
    embeddingModel: GEMINI_EMBEDDING_MODEL,
    config: {
      temperature: parseFloat(process.env.GEMINI_TEMPERATURE || '0.7'),
      topP: parseFloat(process.env.GEMINI_TOP_P || '0.8'),
      topK: parseInt(process.env.GEMINI_TOP_K || '40'),
      maxOutputTokens: parseInt(process.env.GEMINI_MAX_TOKENS || '8192'),
    }
  };
}

export async function testGeminiConnection(): Promise<{ success: boolean; message: string; model?: string }> {
  try {
    console.log('🔍 Testing Gemini connection...');
    
    const testResult = await geminiModel.generateContent('Hello');
    const response = await testResult.response;
    const text = response.text();
    
    if (text) {
      console.log('✅ Gemini connection test passed');
      return {
        success: true,
        message: 'Gemini connection successful',
        model: GEMINI_MODEL,
      };
    } else {
      throw new Error('Empty response from Gemini');
    }
  } catch (error) {
    console.error('❌ Gemini connection test failed:', error);
    
    let errorMessage = 'Unknown error';
    if (error.message.includes('API key')) {
      errorMessage = 'Invalid Google API key';
    } else if (error.message.includes('quota')) {
      errorMessage = 'API quota exceeded';
    } else if (error.message.includes('model')) {
      errorMessage = `Model ${GEMINI_MODEL} not available or invalid`;
    } else if (error.message.includes('network')) {
      errorMessage = 'Network error - check internet connection';
    } else {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
      model: GEMINI_MODEL,
    };
  }
}