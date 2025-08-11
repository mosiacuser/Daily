// Simple wrapper for pdf-parse to avoid import issues
type PdfParse = (buffer: Buffer) => Promise<{ text: string }>;
let pdfParse: PdfParse | null = null;

export async function parsePDF(buffer: Buffer): Promise<{ text: string }> {
  try {
    if (!pdfParse) {
      // Dynamically import pdf-parse to avoid initialization issues
      pdfParse = (await import('pdf-parse')).default;
    }
    
    return await pdfParse(buffer);
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF document');
  }
}