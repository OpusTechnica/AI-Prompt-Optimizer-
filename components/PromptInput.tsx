import React from 'react';
import { OptimizationStyle } from '../types';
import { OPTIMIZATION_STYLES } from '../constants';
import { StyleSelector } from './StyleSelector';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  selectedStyle: OptimizationStyle;
  setSelectedStyle: (style: OptimizationStyle) => void;
  onOptimize: () => void;
  isLoading: boolean;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const OptimizeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.303 17.303a.75.75 0 01-1.061 0l-1.59-1.591a.75.75 0 111.06-1.06l1.591 1.59a.75.75 0 010 1.061zM12 21.75a.75.75 0 01-.75-.75v-2.25a.75.75 0 011.5 0V21a.75.75 0 01-.75-.75zM4.697 17.303a.75.75 0 010-1.06l1.59-1.591a.75.75 0 111.061 1.06l-1.59 1.591a.75.75 0 01-1.06 0zM2.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM6.106 6.106a.75.75 0 011.06 0l1.591 1.59a.75.75 0 01-1.06 1.061L6.106 7.167a.75.75 0 010-1.06z" />
    </svg>
);

const UndoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
  </svg>
);

const RedoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
  </svg>
);


export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  selectedStyle,
  setSelectedStyle,
  onOptimize,
  isLoading,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) => {
  return (
    <div className="glass-card rounded-xl p-6 flex flex-col gap-6">
      <div>
        <div className="flex justify-between items-center mb-2">
            <label htmlFor="original-prompt" className="block text-lg font-semibold text-primary">
            Your Prompt
            </label>
            <div className="flex items-center gap-2">
            <button
                onClick={onUndo}
                disabled={!canUndo}
                className="p-1 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                aria-label="Undo"
            >
                <UndoIcon className="w-5 h-5" />
            </button>
            <button
                onClick={onRedo}
                disabled={!canRedo}
                className="p-1 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                aria-label="Redo"
            >
                <RedoIcon className="w-5 h-5" />
            </button>
            </div>
        </div>
        <textarea
          id="original-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter the prompt you want to improve..."
          className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-600 rounded-lg transition-all duration-300 resize-none text-secondary placeholder-slate-400 dark:placeholder-slate-500 textarea-glow-focus"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-primary">Optimization Style</h3>
        <StyleSelector 
          styles={OPTIMIZATION_STYLES}
          selectedStyle={selectedStyle}
          onSelect={setSelectedStyle}
        />
      </div>

      <button
        onClick={onOptimize}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Optimizing...
          </>
        ) : (
          <>
            <OptimizeIcon className="w-5 h-5" />
            Optimize Prompt
          </>
        )}
      </button>
    </div>
  );
};