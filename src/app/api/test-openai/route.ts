import { NextRequest, NextResponse } from 'next/server';
import { testOpenAIConnection } from '../../../lib/openai-config';
import { testOpenAIChat } from '../../../lib/openai-chat';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing OpenAI connection and chat functionality...');
    
    const connectionResult = await testOpenAIConnection();
    const chatResult = await testOpenAIChat();
    
    if (connectionResult.success && chatResult.success) {
      return NextResponse.json({
        success: true,
        message: 'OpenAI连接和聊天功能正常',
        baseURL: connectionResult.baseURL,
        model: chatResult.model,
        chat: {
          tested: true,
          success: chatResult.success,
          message: chatResult.message
        },
        timestamp: new Date().toISOString(),
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `连接测试: ${connectionResult.success ? '成功' : '失败'}, 聊天测试: ${chatResult.success ? '成功' : '失败'}`,
        baseURL: connectionResult.baseURL,
        connectionError: connectionResult.success ? null : connectionResult.message,
        chatError: chatResult.success ? null : chatResult.message,
        timestamp: new Date().toISOString(),
      }, { status: 400 });
    }

  } catch (error) {
    console.error('❌ Error testing OpenAI:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: error.message || 'Failed to test OpenAI connection',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { resetClient } = await request.json();
    
    if (resetClient) {
      const { resetOpenAIClient } = await import('@/lib/openai-config');
      resetOpenAIClient();
      
      return NextResponse.json({
        success: true,
        message: 'OpenAI client has been reset',
        timestamp: new Date().toISOString(),
      });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Invalid request',
    }, { status: 400 });

  } catch (error) {
    console.error('❌ Error in test-openai API:', error);
    
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