import { NextRequest, NextResponse } from 'next/server';
import { generateOpenAIResponse } from '@/lib/openai-chat';

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    console.log('🤖 Processing chat request with OpenAI');

    // Generate response using OpenAI
    const response = await generateOpenAIResponse(message, history);
    
    return NextResponse.json({
      ...response,
      provider: 'openai',
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: '抱歉，服务器发生错误，请稍后重试。'
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}