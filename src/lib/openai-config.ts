import { OpenAI } from 'openai';

let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is required');
    }

    const config: ConstructorParameters<typeof OpenAI>[0] = {
      apiKey: process.env.OPENAI_API_KEY,
    };

    // Add custom base URL if provided
    if (process.env.OPENAI_BASE_URL && process.env.OPENAI_BASE_URL.trim()) {
      const baseURL = process.env.OPENAI_BASE_URL.trim();
      config.baseURL = baseURL;
      console.log(`🔧 Using custom OpenAI base URL: ${baseURL}`);
    } else {
      console.log('🔧 Using default OpenAI API endpoint');
    }

    try {
      openaiClient = new OpenAI(config);
      console.log('✅ OpenAI client initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize OpenAI client:', error);
      throw new Error(`Failed to initialize OpenAI client: ${error.message}`);
    }
  }

  return openaiClient;
}

export async function testOpenAIConnection(): Promise<{ success: boolean; message: string; baseURL?: string }> {
  try {
    const client = getOpenAIClient();
    
    // Test with a simple completion request
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 5,
    });

    return {
      success: true,
      message: 'OpenAI connection successful',
      baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
    };
  } catch (error) {
    console.error('OpenAI connection test failed:', error);
    
    let errorMessage = 'Unknown error';
    if (error.message.includes('API key')) {
      errorMessage = 'Invalid API key';
    } else if (error.message.includes('network') || error.message.includes('ENOTFOUND')) {
      errorMessage = 'Network error - check base URL and internet connection';
    } else if (error.message.includes('timeout')) {
      errorMessage = 'Request timeout - server may be unreachable';
    } else {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
      baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
    };
  }
}

export function resetOpenAIClient(): void {
  openaiClient = null;
  console.log('🔄 OpenAI client reset');
}