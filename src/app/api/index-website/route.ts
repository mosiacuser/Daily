import { NextRequest, NextResponse } from 'next/server';
import { indexWebsiteContent } from '../../../lib/website-indexer';

export async function POST(request: NextRequest) {
  try {
    // Optional: Add authentication check here
    // const apiKey = request.headers.get('authorization');
    // if (apiKey !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    console.log('Starting website content indexing...');
    
    const result = await indexWebsiteContent();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Successfully indexed ${result.indexed} content items`,
        data: {
          indexed: result.indexed,
          errors: result.errors,
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Indexing completed with errors',
        data: {
          indexed: result.indexed,
          errors: result.errors,
        },
      }, { status: 207 }); // 207 Multi-Status
    }

  } catch (error) {
    console.error('Error in index-website API:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: error.message || '网站内容索引失败，请稍后重试。'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      message: 'Website indexing API is ready',
      endpoints: {
        'POST /api/index-website': 'Index all website content',
      },
      note: 'Send a POST request to index website content into the knowledge base',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
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
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}