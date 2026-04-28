import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // Gemini API Setup
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  // AI Cleaning Endpoint
  app.post('/api/clean-text', async (req, res) => {
    try {
      const { text, options } = req.body;
      
      const prompt = `
        You are an expert document cleaning assistant. Your task is to clean and structure the following extracted PDF text.
        
        GOALS:
        1. Remove repeated headers, footers, and page numbers.
        2. Fix line wrapping issues (broken sentences).
        3. Rejoin hyphenated words at the end of lines (e.g., "pro- duto" -> "produto").
        4. Maintain the logical structure (titles, lists, paragraphs).
        5. Remove watermarks or repetitive noise.
        6. Level of cleaning: ${options?.level || 'balanced'}.
        
        OUTPUT FORMAT:
        Return ONLY the cleaned Markdown text. Do not include any preamble or commentary.
        
        TEXT TO CLEAN:
        ---
        ${text}
        ---
      `;

      const result = await model.generateContent(prompt);
      const cleanedText = result.response.text();
      
      res.json({ cleanedText });
    } catch (error: any) {
      console.error('Gemini Error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
