import * as mammoth from 'mammoth';
import * as cheerio from 'cheerio';
import { parsePDF } from './pdf-wrapper';
import { processImage, processAudio, processVideo, isImageFile, isAudioFile, isVideoFile, ImageProcessingResult, AudioProcessingResult } from './media-processor';

export interface ProcessedDocument {
  content: string;
  metadata: {
    fileName: string;
    fileType: string;
    fileSize: number;
    processedAt: Date;
    chunks: DocumentChunk[];
    mediaResult?: ImageProcessingResult | AudioProcessingResult;
  };
}

export interface DocumentChunk {
  id: string;
  content: string;
  index: number;
  metadata: {
    fileName: string;
    chunkIndex: number;
    startChar: number;
    endChar: number;
  };
}

export async function processDocument(
  file: Buffer, 
  fileName: string, 
  fileType: string
): Promise<ProcessedDocument> {
  let content = '';
  let mediaResult: ImageProcessingResult | AudioProcessingResult | undefined;
  
  try {
    // Handle different file types
    if (isImageFile(fileType)) {
      // Process image
      const imageResult = await processImage(file, fileName);
      content = imageResult.description;
      if (imageResult.extractedText) {
        content += '\n\n提取的文字内容：\n' + imageResult.extractedText;
      }
      mediaResult = imageResult;
      
    } else if (isAudioFile(fileType)) {
      // Process audio
      const audioResult = await processAudio(file, fileName, fileType);
      content = audioResult.transcription;
      mediaResult = audioResult;
      
    } else if (isVideoFile(fileType)) {
      // Process video (extract audio for now)
      try {
        const videoResult = await processVideo(file, fileName, fileType);
        content = videoResult.transcription;
        mediaResult = videoResult;
      } catch (error) {
        content = '视频文件处理失败：' + error.message;
      }
      
    } else {
      // Handle traditional document types
      switch (fileType) {
        case 'application/pdf':
          const pdfData = await parsePDF(file);
          content = pdfData.text;
          break;
          
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'application/msword':
          const docResult = await mammoth.extractRawText({ buffer: file });
          content = docResult.value;
          break;
          
        case 'text/plain':
        case 'text/markdown':
          content = file.toString('utf-8');
          break;
          
        case 'text/html':
          const $ = cheerio.load(file.toString('utf-8'));
          content = $.text();
          break;
          
        default:
          throw new Error(`Unsupported file type: ${fileType}`);
      }
    }
    
    // Clean and process the content
    content = cleanText(content);
    
    // Split into chunks
    const chunks = createChunks(content, fileName);
    
    return {
      content,
      metadata: {
        fileName,
        fileType,
        fileSize: file.length,
        processedAt: new Date(),
        chunks,
        mediaResult
      }
    };
  } catch (error) {
    console.error('Error processing document:', error);
    throw new Error(`Failed to process document: ${error.message}`);
  }
}

function cleanText(text: string): string {
  return text
    .replace(/\\s+/g, ' ')           // Replace multiple whitespace with single space
    .replace(/\\n+/g, '\\n')         // Replace multiple newlines with single newline
    .replace(/[^\\x20-\\x7E\\n]/g, '') // Remove non-printable characters except newlines
    .trim();
}

function createChunks(content: string, fileName: string, chunkSize: number = 1000, overlap: number = 100): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];
  const words = content.split(' ');
  
  let currentChunk = '';
  let chunkIndex = 0;
  let startChar = 0;
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const newChunk = currentChunk ? `${currentChunk} ${word}` : word;
    
    if (newChunk.length > chunkSize && currentChunk) {
      // Create chunk
      const chunk: DocumentChunk = {
        id: `${fileName}_chunk_${chunkIndex}`,
        content: currentChunk.trim(),
        index: chunkIndex,
        metadata: {
          fileName,
          chunkIndex,
          startChar,
          endChar: startChar + currentChunk.length
        }
      };
      
      chunks.push(chunk);
      
      // Start new chunk with overlap
      const overlapWords = currentChunk.split(' ').slice(-overlap);
      currentChunk = `${overlapWords.join(' ')} ${word}`;
      startChar += currentChunk.length - overlapWords.join(' ').length - word.length - 1;
      chunkIndex++;
    } else {
      currentChunk = newChunk;
    }
  }
  
  // Add the last chunk if it has content
  if (currentChunk.trim()) {
    const chunk: DocumentChunk = {
      id: `${fileName}_chunk_${chunkIndex}`,
      content: currentChunk.trim(),
      index: chunkIndex,
      metadata: {
        fileName,
        chunkIndex,
        startChar,
        endChar: startChar + currentChunk.length
      }
    };
    
    chunks.push(chunk);
  }
  
  return chunks;
}

interface PineconeChunk {
  metadata?: {
    content: string;
  };
}

export function combineRelevantChunks(chunks: PineconeChunk[], maxLength: number = 3000): string {
  let combinedContent = '';
  let currentLength = 0;
  
  // Sort chunks by similarity score (assuming they come sorted from Pinecone)
  for (const chunk of chunks) {
    const chunkContent = chunk.metadata?.content || '';
    if (currentLength + chunkContent.length <= maxLength) {
      combinedContent += (combinedContent ? '\\n\\n' : '') + chunkContent;
      currentLength += chunkContent.length;
    } else {
      break;
    }
  }
  
  return combinedContent;
}