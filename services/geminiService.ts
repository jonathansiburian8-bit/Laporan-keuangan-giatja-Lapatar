import { GoogleGenAI } from "@google/genai";
import { Transaction } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'FAKE_API_KEY_FOR_DEVELOPMENT' });

export const analyzeFinances = async (transactions: Transaction[]): Promise<string> => {
  if (transactions.length === 0) {
    return "Belum ada data transaksi untuk dianalisis. Silakan tambahkan pemasukan atau pengeluaran Anda.";
  }

  // Summarize data to send to LLM to save tokens and provide context
  const recentTransactions = transactions.slice(0, 50); // Analyze last 50 transactions
  const summary = JSON.stringify(recentTransactions.map(t => ({
    d: t.date,
    t: t.type,
    a: t.amount,
    c: t.category,
    desc: t.description
  })));

  const prompt = `
    Anda adalah asisten keuangan bisnis/UMKM yang cerdas. Berikut adalah data transaksi keuangan dari berbagai unit usaha (seperti Pangkas, Laundry, Bakery, dll) dalam format JSON:
    ${summary}

    Tolong berikan analisis singkat dalam Bahasa Indonesia yang mencakup:
    1. Unit usaha dengan pengeluaran terbesar atau pemasukan tertinggi (berikan insight performa).
    2. Kesehatan arus kas bisnis secara umum.
    3. 3 saran strategis atau praktis untuk meningkatkan efisiensi atau keuntungan berdasarkan data ini.
    
    Gunakan format Markdown yang rapi. Gunakan nada bicara yang profesional dan solutif.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Maaf, tidak dapat menghasilkan analisis saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terjadi kesalahan saat menghubungi asisten AI. Pastikan API Key valid.";
  }
};