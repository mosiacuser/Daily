import { NextRequest, NextResponse } from 'next/server';
import { processDocument } from '@/lib/document-processor';
import { generateEmbedding } from '@/lib/gemini';
import { upsertDocument, createPineconeIndex } from '@/lib/pinecone';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      // Document types
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
      'text/markdown', 
      'text/html',
      // Image types
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp',
      'image/svg+xml',
      // Audio types
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/m4a',
      'audio/aac',
      'audio/ogg',
      'audio/webm',
      // Video types (basic support)
      'video/mp4',
      'video/avi',
      'video/mov',
      'video/wmv',
      'video/webm'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type' },
        { status: 400 }
      );
    }

    // Validate file size (50MB limit for media files, 10MB for documents)
    const isMediaFile = file.type.startsWith('image/') || file.type.startsWith('audio/') || file.type.startsWith('video/');
    const maxSize = isMediaFile ? 50 * 1024 * 1024 : 10 * 1024 * 1024; // 50MB for media, 10MB for docs
    
    if (file.size > maxSize) {
      const sizeLimit = isMediaFile ? '50MB' : '10MB';
      return NextResponse.json(
        { error: `File too large. Maximum size is ${sizeLimit}.` },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Process the document
    const processedDoc = await processDocument(buffer, file.name, file.type);
    
    // Initialize Pinecone index
    const indexName = process.env.PINECONE_INDEX_NAME || 'ai-training-rag';
    await createPineconeIndex(indexName, 768); // 768 is the dimension for text-embedding-004
    
    // Process and store each chunk
    const results = [];
    for (const chunk of processedDoc.metadata.chunks) {
      try {
        // Generate embedding for the chunk
        const embedding = await generateEmbedding(chunk.content);
        
        // Prepare metadata for Pinecone
        const metadata = {
          fileName: file.name,
          fileType: file.type,
          chunkIndex: chunk.index,
          content: chunk.content,
          startChar: chunk.metadata.startChar,
          endChar: chunk.metadata.endChar,
          uploadedAt: new Date().toISOString(),
          // Add media-specific metadata if available
          ...(processedDoc.metadata.mediaResult && {
            mediaType: processedDoc.metadata.mediaResult.metadata ? 'processed' : 'unknown',
            mediaMetadata: processedDoc.metadata.mediaResult.metadata,
          }),
        };
        
        // Store in Pinecone
        await upsertDocument(indexName, chunk.id, embedding, metadata);
        
        results.push({
          chunkId: chunk.id,
          chunkIndex: chunk.index,
          success: true
        });
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (chunkError) {
        console.error(`Error processing chunk ${chunk.index}:`, chunkError);
        results.push({
          chunkId: chunk.id,
          chunkIndex: chunk.index,
          success: false,
          error: chunkError.message
        });
      }
    }
    
    const successfulChunks = results.filter(r => r.success).length;
    const totalChunks = results.length;
    
    return NextResponse.json({
      success: true,
      message: `Document processed successfully. ${successfulChunks}/${totalChunks} chunks stored.`,
      data: {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        totalChunks,
        successfulChunks,
        processedAt: processedDoc.metadata.processedAt,
        fileType: file.type,
        isMediaFile,
        mediaResult: processedDoc.metadata.mediaResult,
        results
      }
    });

  } catch (error) {
    console.error('Error in upload API:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: error.message || '文件处理失败，请稍后重试。'
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