import { getOpenAIClient } from './openai-config';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  message: string;
  sources: string[];
}

interface SearchResult {
  metadata: {
    source: string;
    content: string;
  };
  score?: number;
}

// Generate embeddings using OpenAI
async function generateOpenAIEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAIClient();
  
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  
  return response.data[0].embedding;
}

// Search for similar documents using OpenAI embeddings
async function searchSimilarDocumentsWithOpenAI(query: string): Promise<SearchResult[]> {
  try {
    // Generate embedding for the query
    const queryEmbedding = await generateOpenAIEmbedding(query);
    
    // For now, return empty array since we need to implement Pinecone search with OpenAI embeddings
    // This is a placeholder - the actual implementation would search Pinecone with the OpenAI embedding
    console.log('🔍 Generated OpenAI embedding for query:', query.substring(0, 50) + '...');
    console.log('📊 Embedding dimensions:', queryEmbedding.length);
    
    // TODO: Implement Pinecone search with OpenAI embeddings
    return [];
  } catch (error) {
    console.error('❌ Error searching with OpenAI embeddings:', error);
    return [];
  }
}

export async function generateOpenAIResponse(
  message: string,
  history: Message[] = []
): Promise<ChatResponse> {
  try {
    console.log('🤖 Generating OpenAI response for:', message.substring(0, 100) + '...');
    
    const openai = getOpenAIClient();
    
    // Search for relevant documents using OpenAI embeddings
    const searchResults = await searchSimilarDocumentsWithOpenAI(message);
    console.log(`📚 Found ${searchResults.length} relevant documents`);
    
    // Prepare context from search results
    const context = searchResults.length > 0 
      ? searchResults.map(result => `来源: ${result.metadata.source}\n内容: ${result.metadata.content}`).join('\n\n')
      : '';
    
    // Prepare system message with RAG context
    const systemMessage = context 
      ? `你是一个智能助手，基于提供的文档内容回答用户问题。请结合文档内容给出准确、有用的回答。如果文档中没有相关信息，请说明并基于你的知识给出最佳建议。

相关文档内容：
${context}

请用中文回答，并在适当时引用相关来源。`
      : '你是一个智能助手，请用中文回答用户的问题。';

    // Prepare conversation history
    const messages: Message[] = [
      { role: 'system', content: systemMessage },
      ...history.slice(-6), // Keep last 6 messages for context
      { role: 'user', content: message }
    ];

    console.log('📤 Sending request to OpenAI...');
    
    // Generate response using OpenAI
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages,
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000'),
      top_p: parseFloat(process.env.OPENAI_TOP_P || '0.9'),
    });

    const response = completion.choices[0]?.message?.content || '抱歉，我无法生成回复。';
    
    // Extract sources from search results
    const sources = searchResults.map(result => result.metadata.source || 'Unknown source');
    
    console.log('✅ OpenAI response generated successfully');
    
    return {
      message: response,
      sources: [...new Set(sources)] // Remove duplicates
    };

  } catch (error) {
    console.error('❌ Error generating OpenAI response:', error);
    
    // Fallback response without RAG
    try {
      const openai = getOpenAIClient();
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: '你是一个智能助手，请用中文回答用户的问题。' },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content || '抱歉，我无法处理您的请求。';
      
      return {
        message: response,
        sources: []
      };
    } catch (fallbackError) {
      console.error('❌ Fallback OpenAI request also failed:', fallbackError);
      throw new Error('OpenAI service is currently unavailable');
    }
  }
}

export async function testOpenAIChat(): Promise<{ success: boolean; message: string; model?: string }> {
  try {
    console.log('🧪 Testing OpenAI chat functionality...');
    
    const openai = getOpenAIClient();
    const testMessage = '请用一句话介绍你自己。';
    
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'user', content: testMessage }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (response) {
      console.log('✅ OpenAI chat test successful');
      return {
        success: true,
        message: 'OpenAI聊天功能正常',
        model: completion.model || process.env.OPENAI_MODEL || 'gpt-4o-mini'
      };
    } else {
      throw new Error('No response from OpenAI');
    }

  } catch (error) {
    console.error('❌ OpenAI chat test failed:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      message: `OpenAI聊天测试失败: ${message}`
    };
  }
}