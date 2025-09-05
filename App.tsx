import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { OptimizedOutput } from './components/OptimizedOutput';
import { ExamplePrompts } from './components/ExamplePrompts';
import { History } from './components/History';
import { optimizePrompt } from './services/geminiService';
import { OptimizationStyle, HistoryItem } from './types';
import { OPTIMIZATION_STYLES } from './constants';
import { useHistoryState } from './hooks/useHistoryState';
import { useTheme } from './hooks/useTheme';

type ActiveTab = 'inspiration' | 'history';

const App: React.FC = () => {
  const [
    originalPrompt,
    setOriginalPrompt,
    undoPrompt,
    redoPrompt,
    canUndoPrompt,
    canRedoPrompt
  ] = useHistoryState<string>('');
  const [optimizationStyle, setOptimizationStyle] = useState<OptimizationStyle>(OPTIMIZATION_STYLES[0].style);
  const [optimizedPrompt, setOptimizedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('inspiration');
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    try {
      const storedHistory = window.localStorage.getItem('promptHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to load history from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('promptHistory', JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  }, [history]);


  const handleOptimize = useCallback(async () => {
    if (!originalPrompt.trim()) {
      setError('Please enter a prompt to optimize.');
      return;
    }

    if (!process.env.API_KEY || process.env.API_KEY.trim() === '') {
        setError("API Key Not Configured: This application requires a valid Google Gemini API key to function.");
        setIsLoading(false);
        return;
    }

    setIsLoading(true);
    setError(null);
    setOptimizedPrompt('');

    try {
      const result = await optimizePrompt(originalPrompt, optimizationStyle);
      setOptimizedPrompt(result);
      
      const newHistoryItem: HistoryItem = {
        id: crypto.randomUUID(),
        originalPrompt,
        optimizationStyle,
        optimizedPrompt: result,
        timestamp: Date.now(),
      };
      setHistory(prevHistory => [newHistoryItem, ...prevHistory].slice(0, 50)); // Keep last 50
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [originalPrompt, optimizationStyle]);
  
  const handleLoadFromHistory = (item: HistoryItem) => {
    setOriginalPrompt(item.originalPrompt);
    setOptimizationStyle(item.optimizationStyle);
    setOptimizedPrompt(item.optimizedPrompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const InspirationIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM5.404 15.657a.75.75 0 10-1.06-1.06l-1.06 1.061a.75.75 0 101.06 1.06l1.06-1.06zM16.718 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM2.75 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012.75 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM6.464 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 00-1.06 1.06l1.06 1.06z" clipRule="evenodd" />
    </svg>
  );

  const HistoryIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v.083c.442.062.852.176 1.22.336a.75.75 0 01.522 1.342A6.479 6.479 0 0010.5 9.756V10.5h.75a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75V2.75A.75.75 0 0110 2z" clipRule="evenodd" />
      <path d="M5.12 3.562A7.964 7.964 0 0110 2.012a7.964 7.964 0 014.88 1.55.75.75 0 00.994-1.124A9.464 9.464 0 0010 .56a9.464 9.464 0 00-5.874 2.072.75.75 0 00.994 1.124zM16.89 16.166a.75.75 0 00-1.113-.981 7.963 7.963 0 01-11.555 0 .75.75 0 10-1.113.982A9.463 9.463 0 0010 18.44a9.463 9.463 0 006.89-2.274z" />
    </svg>
  );


  return (
    <div className="min-h-screen flex flex-col">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 opacity-0 animate-slide-up">
          <PromptInput
            prompt={originalPrompt}
            setPrompt={setOriginalPrompt}
            selectedStyle={optimizationStyle}
            setSelectedStyle={setOptimizationStyle}
            onOptimize={handleOptimize}
            isLoading={isLoading}
            onUndo={undoPrompt}
            onRedo={redoPrompt}
            canUndo={canUndoPrompt}
            canRedo={canRedoPrompt}
          />
          <OptimizedOutput
            optimizedPrompt={optimizedPrompt}
            isLoading={isLoading}
            error={error}
          />
        </div>
        
        <div className="mt-12 lg:mt-16 opacity-0 animate-slide-up animation-delay-200">
          <div className="border-b border-slate-300 dark:border-slate-700/80 mb-6">
            <div className="flex space-x-1 -mb-px">
              <button
                onClick={() => setActiveTab('inspiration')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ${
                  activeTab === 'inspiration'
                    ? 'border-blue-500 text-accent'
                    : 'border-transparent text-tertiary hover:text-primary hover:border-slate-400 dark:hover:border-slate-500'
                }`}
              >
                <InspirationIcon className="w-5 h-5" />
                Inspiration
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-accent'
                    : 'border-transparent text-tertiary hover:text-primary hover:border-slate-400 dark:hover:border-slate-500'
                }`}
              >
                <HistoryIcon className="w-5 h-5" />
                History
              </button>
            </div>
          </div>
          
          {activeTab === 'inspiration' && (
            <ExamplePrompts
              setPrompt={setOriginalPrompt}
              setSelectedStyle={setOptimizationStyle}
            />
          )}

          {activeTab === 'history' && (
            <History
              history={history}
              onLoadItem={handleLoadFromHistory}
              onClear={handleClearHistory}
            />
          )}
        </div>

      </main>
      <footer className="text-center p-4 text-tertiary text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;