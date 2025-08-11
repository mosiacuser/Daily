import { NextRequest, NextResponse } from 'next/server';
import { testGeminiConnection, getModelInfo } from '../../../lib/gemini';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing Gemini connection and model configuration...');
    
    // Get current model configuration
    const modelInfo = getModelInfo();
    
    // Test connection
    const connectionResult = await testGeminiConnection();
    
    return NextResponse.json({
      success: connectionResult.success,
      message: connectionResult.message,
      modelInfo: {
        mainModel: modelInfo.mainModel,
        embeddingModel: modelInfo.embeddingModel,
        config: modelInfo.config,
      },
      timestamp: new Date().toISOString(),
    }, { status: connectionResult.success ? 200 : 400 });

  } catch (error) {
    console.error('❌ Error testing Gemini connection:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: error.message || 'Failed to test Gemini connection',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'getModelInfo') {
      const modelInfo = getModelInfo();
      
      return NextResponse.json({
        success: true,
        modelInfo,
        availableModels: [
          {
            id: 'gemini-2.0-flash-exp',
            name: 'Gemini 2.0 Flash (Experimental)',
            description: '最新的实验性模型，速度快，性能强'
          },
          {
            id: 'gemini-1.5-pro-latest',
            name: 'Gemini 1.5 Pro',
            description: '稳定的专业模型，平衡性能和可靠性'
          },
          {
            id: 'gemini-1.5-flash-latest',
            name: 'Gemini 1.5 Flash',
            description: '快速响应模型，适合实时交互'
          }
        ],
        timestamp: new Date().toISOString(),
      });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Invalid action',
    }, { status: 400 });

  } catch (error) {
    console.error('❌ Error in test-gemini API:', error);
    
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