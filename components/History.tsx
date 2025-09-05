import React from 'react';
import { HistoryItem, OptimizationStyle } from '../types';

interface HistoryProps {
  history: HistoryItem[];
  onLoadItem: (item: HistoryItem) => void;
  onClear: () => void;
}

const ReuseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201-4.42 5.5 5.5 0 011.663-3.61.75.75 0 10-1.04-1.082A7 7 0 003.5 12.5a7 7 0 0011.95 4.95.75.75 0 00-1.138-1.026zM17.25 4.75a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z" clipRule="evenodd" />
    <path d="M15 5.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z" />
  </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.22-2.365.468a.75.75 0 10.23 1.482l.149-.046A12.705 12.705 0 0110 6a12.705 12.705 0 015.986-1.898l.149.046a.75.75 0 10.23-1.482A14.22 14.22 0 0014 4.193v-.443A2.75 2.75 0 0011.25 1h-2.5zM10 8a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5A.75.75 0 0110 8z" clipRule="evenodd" />
  </svg>
);


export const History: React.FC<HistoryProps> = ({ history, onLoadItem, onClear }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-16 opacity-0 animate-fade-in animation-delay-400">
        <h3 className="text-xl font-semibold text-primary">No History Yet</h3>
        <p className="mt-2 text-tertiary">Your optimized prompts will appear here after you run them.</p>
      </div>
    );
  }

  return (
    <div className="opacity-0 animate-fade-in animation-delay-400">
       <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-primary">Optimization History</h2>
            <p className="mt-1 text-sm text-secondary">Review and reuse your past prompts.</p>
          </div>
          <button 
            onClick={onClear}
            className="flex items-center gap-2 text-sm font-medium py-2 px-3 rounded-lg border hover:border-red-500/50 hover-text-danger transition-colors duration-200 btn-secondary-outline"
            aria-label="Clear all history"
           >
            <TrashIcon className="w-4 h-4" />
            Clear All
          </button>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="glass-card rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-grow overflow-hidden">
                <div className="flex items-center gap-3 mb-2">
                    <span className="inline-block flex-shrink-0 bg-blue-50 dark:bg-slate-700/80 text-tag text-xs font-semibold px-2.5 py-1 rounded-full">
                        {item.optimizationStyle}
                    </span>
                    <p className="text-sm text-tertiary truncate" title={item.originalPrompt}>
                      <span className="font-semibold text-secondary">Original:</span> "{item.originalPrompt}"
                    </p>
                </div>

                <p className="text-sm text-secondary truncate" title={item.optimizedPrompt}>
                  <span className="font-semibold text-success">Optimized:</span> "{item.optimizedPrompt}"
                </p>
            </div>
            <button
                onClick={() => onLoadItem(item)}
                className="flex-shrink-0 w-full md:w-auto flex items-center justify-center gap-2 font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-blue-500 btn-secondary-fill"
                aria-label="Reuse this prompt"
            >
              <ReuseIcon className="w-5 h-5" />
              Reuse
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};