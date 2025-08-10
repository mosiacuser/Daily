import sharp from 'sharp';
import { generateResponse } from './gemini';
import { getOpenAIClient } from './openai-config';

export interface ImageProcessingResult {
  description: string;
  extractedText?: string;
  metadata: {
    width: number;
    height: number;
    format: string;
    size: number;
  };
}

export interface AudioProcessingResult {
  transcription: string;
  metadata: {
    duration?: number;
    format: string;
    size: number;
  };
}

export async function processImage(buffer: Buffer, fileName: string): Promise<ImageProcessingResult> {
  try {
    // Get image metadata using sharp
    const imageInfo = await sharp(buffer).metadata();
    
    // Convert to base64 for AI processing
    const base64Image = buffer.toString('base64');
    const mimeType = `image/${imageInfo.format}`;
    
    // Use Gemini Vision for image description and OCR
    const description = await generateImageDescription(base64Image, mimeType);
    
    return {
      description,
      metadata: {
        width: imageInfo.width || 0,
        height: imageInfo.height || 0,
        format: imageInfo.format || 'unknown',
        size: buffer.length,
      }
    };
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error(`Failed to process image: ${error.message}`);
  }
}

export async function processAudio(buffer: Buffer, fileName: string, mimeType: string): Promise<AudioProcessingResult> {
  try {
    // Get OpenAI client with custom configuration
    const openai = getOpenAIClient();

    // Create a temporary file-like object for OpenAI
    const file = new File([buffer], fileName, { type: mimeType });
    
    // Use OpenAI Whisper for transcription
    console.log(`🎵 Processing audio file: ${fileName}`);
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      language: 'zh', // Support Chinese and auto-detect
    });

    console.log('✅ Audio transcription completed successfully');
    return {
      transcription: transcription.text,
      metadata: {
        format: mimeType,
        size: buffer.length,
      }
    };
  } catch (error) {
    console.error('❌ Error processing audio:', error);
    
    // Provide more detailed error information
    if (error.message.includes('API key')) {
      throw new Error('OpenAI API key is invalid or missing');
    } else if (error.message.includes('base URL') || error.message.includes('baseURL')) {
      throw new Error('OpenAI base URL is invalid. Please check OPENAI_BASE_URL configuration');
    } else if (error.message.includes('network') || error.message.includes('timeout')) {
      throw new Error('Network error connecting to OpenAI API. Please check your connection and base URL');
    }
    
    throw new Error(`Failed to process audio: ${error.message}`);
  }
}

async function generateImageDescription(base64Image: string, mimeType: string): Promise<string> {
  try {
    // Create a comprehensive prompt for image analysis
    const prompt = `请详细分析这张图片，包括：
1. 图片的主要内容和主题
2. 可见的文字内容（如果有的话）
3. 重要的视觉元素、颜色、构图
4. 如果是截图或包含界面元素，请描述界面布局和功能
5. 如果是图表或数据可视化，请描述数据和趋势
6. 任何其他重要的细节

请用中文提供详细而准确的描述，这将用于知识库检索。

图片内容：`;

    // Use Gemini Pro Vision for analysis
    const response = await generateResponse(`${prompt}\n\n[Image: ${mimeType}]`);
    
    return response;
  } catch (error) {
    console.error('Error generating image description:', error);
    return '图片处理失败，无法生成描述。';
  }
}

export function isImageFile(mimeType: string): boolean {
  return mimeType.startsWith('image/') && [
    'image/jpeg',
    'image/png', 
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/svg+xml'
  ].includes(mimeType);
}

export function isAudioFile(mimeType: string): boolean {
  return mimeType.startsWith('audio/') && [
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/m4a',
    'audio/aac',
    'audio/ogg',
    'audio/webm'
  ].includes(mimeType);
}

export function isVideoFile(mimeType: string): boolean {
  return mimeType.startsWith('video/') && [
    'video/mp4',
    'video/avi',
    'video/mov',
    'video/wmv',
    'video/webm'
  ].includes(mimeType);
}

export async function processVideo(buffer: Buffer, fileName: string, mimeType: string): Promise<AudioProcessingResult> {
  // For now, we'll treat video as audio and extract audio track for transcription
  // In a production environment, you might want to use ffmpeg to extract audio
  try {
    // Note: This is a simplified approach. In production, you'd want to:
    // 1. Extract audio track from video using ffmpeg
    // 2. Process the extracted audio
    // 3. Optionally extract frames for image analysis
    
    throw new Error('Video processing not fully implemented. Please extract audio manually.');
  } catch (error) {
    console.error('Error processing video:', error);
    throw new Error(`Failed to process video: ${error.message}`);
  }
}