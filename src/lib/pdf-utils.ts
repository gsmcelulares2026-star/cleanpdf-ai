import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Initialize PDF.js worker
// Use the local worker file instead of CDN for better reliability
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export interface ExtractedPage {
  pageNumber: number;
  text: string;
}

export async function extractTextFromPDF(file: File): Promise<ExtractedPage[]> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const pages: ExtractedPage[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const textItems = textContent.items as any[];
    const pageText = textItems.map(item => item.str).join(' ');
    pages.push({ pageNumber: i, text: pageText });
  }

  return pages;
}
