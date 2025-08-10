import { Pinecone } from '@pinecone-database/pinecone';

let pinecone: Pinecone | null = null;

export function initializePinecone(): Pinecone {
  if (!pinecone) {
    if (!process.env.PINECONE_API_KEY) {
      throw new Error('PINECONE_API_KEY is not set');
    }

    console.log('🔗 Initializing Pinecone with latest SDK (v6+)...');
    
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
    
    console.log('✅ Pinecone client initialized successfully');
  }
  return pinecone;
}

export async function testPineconeConnection(): Promise<{ success: boolean; message: string; details?: any }> {
  try {
    console.log('🔍 Testing Pinecone connection...');
    
    const pc = initializePinecone();
    
    // Test connection by listing indexes
    const indexList = await pc.listIndexes();
    
    console.log('✅ Pinecone connection test passed');
    
    return {
      success: true,
      message: 'Pinecone connection successful',
      details: {
        totalIndexes: indexList.indexes?.length || 0,
        indexes: indexList.indexes?.map(index => ({
          name: index.name,
          dimension: index.dimension,
          metric: index.metric,
          status: index.status?.ready ? 'ready' : 'not ready'
        })) || []
      }
    };
  } catch (error) {
    console.error('❌ Pinecone connection test failed:', error);
    
    let errorMessage = 'Unknown error';
    if (error.message.includes('API key')) {
      errorMessage = 'Invalid Pinecone API key';
    } else if (error.message.includes('network') || error.message.includes('timeout')) {
      errorMessage = 'Network error - check internet connection';
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      errorMessage = 'API quota or rate limit exceeded';
    } else {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function createPineconeIndex(indexName: string, dimension: number = 768) {
  const pc = initializePinecone();
  
  try {
    console.log(`🔍 Checking if index "${indexName}" exists...`);
    const indexList = await pc.listIndexes();
    const indexExists = indexList.indexes?.some(index => index.name === indexName);
    
    if (!indexExists) {
      console.log(`📝 Creating new index "${indexName}" with dimension ${dimension}...`);
      
      // Use configurable cloud and region, with defaults
      const cloud = process.env.PINECONE_CLOUD || 'aws';
      const region = process.env.PINECONE_REGION || 'us-east-1';
      
      await pc.createIndex({
        name: indexName,
        dimension: dimension,
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: cloud as 'aws' | 'gcp' | 'azure',
            region: region
          }
        }
      });
      
      console.log(`⏳ Waiting for index "${indexName}" to be ready...`);
      // Wait for index to be ready
      await new Promise(resolve => setTimeout(resolve, 60000));
      console.log(`✅ Index "${indexName}" created successfully`);
    } else {
      console.log(`✅ Index "${indexName}" already exists`);
    }
    
    return pc.index(indexName);
  } catch (error) {
    console.error(`❌ Error creating Pinecone index "${indexName}":`, error);
    throw error;
  }
}

export async function searchSimilarDocuments(
  indexName: string, 
  queryEmbedding: number[], 
  topK: number = 5
): Promise<any[]> {
  try {
    const pc = initializePinecone();
    const index = pc.index(indexName);
    
    const searchResponse = await index.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
      includeValues: false,
    });
    
    return searchResponse.matches || [];
  } catch (error) {
    console.error('Error searching similar documents:', error);
    return [];
  }
}

export async function upsertDocument(
  indexName: string,
  id: string,
  embedding: number[],
  metadata: Record<string, any>
) {
  try {
    const pc = initializePinecone();
    const index = pc.index(indexName);
    
    await index.upsert([{
      id,
      values: embedding,
      metadata
    }]);
  } catch (error) {
    console.error('Error upserting document:', error);
    throw error;
  }
}