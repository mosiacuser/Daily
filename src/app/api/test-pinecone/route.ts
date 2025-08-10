import { NextRequest, NextResponse } from 'next/server';
import { testPineconeConnection } from '@/lib/pinecone';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing Pinecone connection with latest SDK...');
    
    const connectionResult = await testPineconeConnection();
    
    return NextResponse.json({
      success: connectionResult.success,
      message: connectionResult.message,
      details: connectionResult.details,
      sdk: {
        version: '6.1.2+',
        note: 'Using latest Pinecone SDK without PINECONE_ENVIRONMENT'
      },
      timestamp: new Date().toISOString(),
    }, { status: connectionResult.success ? 200 : 400 });

  } catch (error) {
    console.error('❌ Error testing Pinecone connection:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: error.message || 'Failed to test Pinecone connection',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'getIndexInfo') {
      const connectionResult = await testPineconeConnection();
      
      return NextResponse.json({
        success: connectionResult.success,
        message: connectionResult.message,
        indexes: connectionResult.details?.indexes || [],
        totalIndexes: connectionResult.details?.totalIndexes || 0,
        migrationInfo: {
          oldVariable: 'PINECONE_ENVIRONMENT (deprecated in SDK v1+)',
          newApproach: 'Automatic region detection via API key',
          benefits: [
            'Simplified configuration',
            'No manual environment setup',
            'Automatic project association'
          ]
        },
        timestamp: new Date().toISOString(),
      });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Invalid action',
    }, { status: 400 });

  } catch (error) {
    console.error('❌ Error in test-pinecone API:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: error.message || 'API request failed',
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}