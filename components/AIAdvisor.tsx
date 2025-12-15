import React, { useState } from 'react';
import { Transaction } from '../types';
import { analyzeFinances } from '../services/geminiService';
import { Sparkles, Loader2, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AIAdvisorProps {
  transactions: Transaction[];
}

export const AIAdvisor: React.FC<AIAdvisorProps> = ({ transactions }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeFinances(transactions);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-xl mb-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30">
                <Bot className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-white">Giatja AI Advisor</h3>
                <p className="text-slate-400 text-xs">Ditenagai oleh Google Gemini 2.5</p>
            </div>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-600 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-500/20"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? 'Menganalisis...' : 'Analisis Keuangan Saya'}
          </button>
        </div>

        {analysis && (
          <div className="mt-6 bg-slate-800/50 rounded-lg p-5 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{analysis}</ReactMarkdown>
             </div>
          </div>
        )}
        
        {!analysis && !loading && (
            <p className="text-slate-400 text-sm mt-2">
                Klik tombol di atas untuk mendapatkan saran cerdas tentang kebiasaan belanja dan tips penghematan berdasarkan data transaksi Anda.
            </p>
        )}
      </div>
    </div>
  );
};