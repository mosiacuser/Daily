import fs from 'fs';
import path from 'path';
import { getOpenAIClient } from './openai-config';
import { upsertDocument, createPineconeIndex } from './pinecone';

// Generate embeddings using OpenAI
async function generateOpenAIEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAIClient();
  
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  
  return response.data[0].embedding;
}

export interface WebsiteContent {
  title: string;
  content: string;
  url: string;
  type: 'page' | 'markdown' | 'component';
  metadata: {
    lastModified: Date;
    filePath?: string;
    size: number;
  };
}

export interface IndexedContent {
  id: string;
  content: string;
  embedding?: number[];
  metadata: {
    title: string;
    url: string;
    type: string;
    source: string;
    chunkIndex?: number;
    lastModified: string;
  };
}

export async function indexWebsiteContent(): Promise<{ success: boolean; indexed: number; errors: string[] }> {
  const results = { success: true, indexed: 0, errors: [] as string[] };
  
  try {
    // Initialize Pinecone index with OpenAI embedding dimensions
    const indexName = process.env.PINECONE_INDEX_NAME || 'ai-training-openai-rag';
    await createPineconeIndex(indexName, 1536); // OpenAI text-embedding-3-small dimensions
    
    // Scan and index different types of content
    const contentSources = [
      await scanAppPages(),
      await scanMarkdownFiles(),
      await scanPublicAssets(),
    ];
    
    for (const contents of contentSources) {
      for (const content of contents) {
        try {
          await indexSingleContent(content, indexName);
          results.indexed++;
        } catch (error) {
          results.errors.push(`Error indexing ${content.url}: ${error.message}`);
        }
      }
    }
    
  } catch (error) {
    results.success = false;
    results.errors.push(`General indexing error: ${error.message}`);
  }
  
  return results;
}

async function scanAppPages(): Promise<WebsiteContent[]> {
  const contents: WebsiteContent[] = [];
  const appDir = path.join(process.cwd(), 'src/app');
  
  try {
    await scanDirectoryForPages(appDir, '', contents);
  } catch (error) {
    console.error('Error scanning app pages:', error);
  }
  
  return contents;
}

async function scanDirectoryForPages(dir: string, urlPrefix: string, contents: WebsiteContent[]): Promise<void> {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'api') {
        const newUrlPrefix = path.posix.join(urlPrefix, entry.name);
        await scanDirectoryForPages(fullPath, newUrlPrefix, contents);
      } else if (entry.name === 'page.tsx') {
        try {
          const fileContent = fs.readFileSync(fullPath, 'utf-8');
          const stats = fs.statSync(fullPath);
          
          // Extract meaningful content from React component
          const extractedContent = extractContentFromReactComponent(fileContent);
          
          if (extractedContent.trim()) {
            const url = urlPrefix || '/';
            const title = generateTitleFromPath(urlPrefix) || 'Home';
            
            contents.push({
              title,
              content: extractedContent,
              url,
              type: 'page',
              metadata: {
                lastModified: stats.mtime,
                filePath: fullPath,
                size: stats.size,
              }
            });
          }
        } catch (error) {
          console.error(`Error reading page ${fullPath}:`, error);
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }
}

async function scanMarkdownFiles(): Promise<WebsiteContent[]> {
  const contents: WebsiteContent[] = [];
  const rootDir = process.cwd();
  
  try {
    const markdownFiles = [
      'README.md',
      'README-RAG.md',
      'Gemini.md',
      'ai-training.md'
    ];
    
    for (const fileName of markdownFiles) {
      const filePath = path.join(rootDir, fileName);
      
      if (fs.existsSync(filePath)) {
        try {
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const stats = fs.statSync(filePath);
          
          const title = extractTitleFromMarkdown(fileContent) || fileName.replace('.md', '');
          
          contents.push({
            title,
            content: fileContent,
            url: `/${fileName}`,
            type: 'markdown',
            metadata: {
              lastModified: stats.mtime,
              filePath,
              size: stats.size,
            }
          });
        } catch (error) {
          console.error(`Error reading markdown ${filePath}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error scanning markdown files:', error);
  }
  
  return contents;
}

async function scanPublicAssets(): Promise<WebsiteContent[]> {
  const contents: WebsiteContent[] = [];
  // For now, we'll skip public assets unless they contain text content
  // In the future, we could process images in the public folder
  return contents;
}

function extractContentFromReactComponent(code: string): string {
  const lines = code.split('\\n');
  const contentLines: string[] = [];
  
  for (const line of lines) {
    // Extract string literals that likely contain user-visible text
    const stringMatches = line.match(/['""`]([^'""`]*)['""`]/g);
    if (stringMatches) {
      for (const match of stringMatches) {
        const content = match.slice(1, -1); // Remove quotes
        
        // Filter out likely code/import statements
        if (content.length > 3 && 
            !content.includes('/') && 
            !content.includes('@') && 
            !content.includes('className') &&
            !content.includes('px-') &&
            !content.includes('text-') &&
            !content.includes('bg-') &&
            !content.includes('border-') &&
            !/^[a-z-]+$/.test(content)) { // Skip CSS classes
          contentLines.push(content);
        }
      }
    }
    
    // Extract JSX text content
    const jsxTextMatch = line.match(/>(.*?)</);
    if (jsxTextMatch && jsxTextMatch[1].trim() && 
        !jsxTextMatch[1].includes('{') && 
        jsxTextMatch[1].length > 3) {
      contentLines.push(jsxTextMatch[1].trim());
    }
  }
  
  return contentLines.join(' ').replace(/\\s+/g, ' ').trim();
}

function extractTitleFromMarkdown(content: string): string | null {
  const lines = content.split('\\n');
  for (const line of lines) {
    if (line.startsWith('# ')) {
      return line.substring(2).trim();
    }
  }
  return null;
}

function generateTitleFromPath(urlPath: string): string {
  if (!urlPath || urlPath === '/') return 'Home';
  
  return urlPath
    .split('/')
    .filter(Boolean)
    .map(segment => segment.replace(/-/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase()))
    .join(' - ');
}

async function indexSingleContent(content: WebsiteContent, indexName: string): Promise<void> {
  try {
    // Split content into chunks if it's too long
    const chunks = splitContentIntoChunks(content.content, 1000);
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const chunkId = `website_${content.url.replace(/[^a-zA-Z0-9]/g, '_')}_chunk_${i}`;
      
      // Generate embedding using OpenAI
      const embedding = await generateOpenAIEmbedding(chunk);
      
      // Prepare metadata
      const metadata = {
        title: content.title,
        url: content.url,
        type: content.type,
        source: 'website',
        chunkIndex: i,
        lastModified: content.metadata.lastModified.toISOString(),
        content: chunk,
        fileName: content.title,
      };
      
      // Store in Pinecone
      await upsertDocument(indexName, chunkId, embedding, metadata);
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  } catch (error) {
    console.error(`Error indexing content ${content.url}:`, error);
    throw error;
  }
}

function splitContentIntoChunks(content: string, chunkSize: number = 1000): string[] {
  const chunks: string[] = [];
  const words = content.split(' ');
  
  let currentChunk = '';
  for (const word of words) {
    if ((currentChunk + ' ' + word).length > chunkSize && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = word;
    } else {
      currentChunk = currentChunk ? currentChunk + ' ' + word : word;
    }
  }
  
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks.filter(chunk => chunk.length > 10); // Filter out very short chunks
}