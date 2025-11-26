import React, { useState } from 'react';
import { Icons } from './Icons';
import { GeminiStatus } from '../types';

interface AiInsightWidgetProps {
  onGenerate: () => Promise<string>;
}

export const AiInsightWidget: React.FC<AiInsightWidgetProps> = ({ onGenerate }) => {
  const [status, setStatus] = useState<GeminiStatus>(GeminiStatus.IDLE);
  const [insight, setInsight] = useState<string>("");

  const handleGenerate = async () => {
    setStatus(GeminiStatus.LOADING);
    try {
      const result = await onGenerate();
      setInsight(result);
      setStatus(GeminiStatus.SUCCESS);
    } catch (e) {
      setStatus(GeminiStatus.ERROR);
    }
  };

  return (
    <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-indigo-950/20 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Icons.Sparkles size={100} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-indigo-500/20 rounded-md border border-indigo-500/30 text-indigo-400">
            <Icons.Sparkles size={16} />
          </div>
          <h3 className="text-base font-bold text-white">Gemini Insights</h3>
        </div>

        {status === GeminiStatus.IDLE && (
          <div className="flex flex-col items-start gap-3">
            <p className="text-sm text-zinc-400 max-w-md">
              Generate an executive summary of your current dashboard performance using Google Gemini 2.5 Flash.
            </p>
            <button 
              onClick={handleGenerate}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5"
            >
              Analyze Data <Icons.ArrowRight size={14} />
            </button>
          </div>
        )}

        {status === GeminiStatus.LOADING && (
          <div className="flex items-center gap-3 text-sm text-zinc-400 animate-pulse">
            <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            Analyzing metrics and trends...
          </div>
        )}

        {status === GeminiStatus.SUCCESS && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <p className="text-sm text-zinc-200 leading-relaxed border-l-2 border-indigo-500 pl-4 py-1 bg-indigo-500/5 rounded-r-lg">
              {insight}
            </p>
            <button 
              onClick={handleGenerate} 
              className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 font-medium underline decoration-dotted"
            >
              Refresh Analysis
            </button>
          </div>
        )}

        {status === GeminiStatus.ERROR && (
          <div className="text-rose-400 text-sm">
            <p>Failed to generate insights. Please check your API key or try again.</p>
            <button 
              onClick={handleGenerate} 
              className="mt-2 text-xs text-white underline"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};