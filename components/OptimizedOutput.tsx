import React, { useState, useEffect } from 'react';
import { Spinner } from './Spinner';

interface OptimizedOutputProps {
  optimizedPrompt: string;
  isLoading: boolean;
  error: string | null;
}

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 4.625v2.625a2.625 2.625 0 01-2.625 2.625H12a2.625 2.625 0 01-2.625-2.625V12a2.625 2.625 0 012.625-2.625h2.625a2.625 2.625 0 012.625 2.625v2.625z" />
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const parseInline = (text: string) => {
    // Using regex to replace markdown syntax with HTML tags
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold **text**
    text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');   // Bold __text__
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');         // Italic *text*
    text = text.replace(/_(.*?)_/g, '<em>$1</em>');         // Italic _text_
    text = text.replace(/`(.*?)`/g, '<code class="bg-slate-200 dark:bg-slate-700/80 text-pink-600 dark:text-pink-400 font-mono text-sm rounded-md px-1.5 py-0.5 mx-0.5">$1</code>'); // Inline code `code`
    return { __html: text };
  };

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key} className="list-disc pl-6 space-y-1 my-2">
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={parseInline(item)} />
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    if (line.startsWith('## ')) {
      flushList(`ul-${index}`);
      elements.push(<h2 key={index} className="text-xl font-bold mt-4 mb-2 text-primary" dangerouslySetInnerHTML={parseInline(line.substring(3))} />);
    } else if (line.startsWith('### ')) {
      flushList(`ul-${index}`);
      elements.push(<h3 key={index} className="text-lg font-semibold mt-3 mb-1 text-primary" dangerouslySetInnerHTML={parseInline(line.substring(4))} />);
    } else if (line.trim().startsWith('- ')) {
      listItems.push(line.trim().substring(2));
    } else {
      flushList(`ul-${index}`);
      if (line.trim() !== '') {
        elements.push(<p key={index} className="my-1" dangerouslySetInnerHTML={parseInline(line)} />);
      }
    }
  });

  flushList('ul-end'); // Flush any remaining list items

  return <>{elements}</>;
};


export const OptimizedOutput: React.FC<OptimizedOutputProps> = ({ optimizedPrompt, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (optimizedPrompt) {
      navigator.clipboard.writeText(optimizedPrompt);
      setCopied(true);
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    // Reset copied state when a new prompt is generated
    if(optimizedPrompt) {
      setCopied(false);
    }
  }, [optimizedPrompt]);


  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-tertiary">
          <Spinner />
          <p className="mt-4 text-lg">Optimizing your prompt...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex items-center justify-center h-full text-center text-red-600 dark:text-red-400">
          <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-xl border border-red-400/40 dark:border-red-500/40 max-w-md w-full">
            <div className="flex flex-col items-center">
              <ErrorIcon className="w-10 h-10 text-red-500 dark:text-red-400 mb-3" />
              <p className="text-lg font-semibold text-red-800 dark:text-red-300">Optimization Failed</p>
              <p className="mt-1 text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        </div>
      );
    }
    if (!optimizedPrompt) {
      return (
        <div className="flex items-center justify-center h-full text-center text-tertiary">
          <p className="text-lg">Your optimized prompt will appear here.</p>
        </div>
      );
    }
    return (
        <div className="relative h-full">
            <div
              id="optimized-prompt-preview"
              className="w-full h-full p-4 pr-12 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-600 rounded-lg overflow-y-auto text-secondary"
              aria-live="polite"
            >
              <MarkdownRenderer content={optimizedPrompt} />
            </div>
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md transition-colors text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
                aria-label="Copy to clipboard"
            >
                {copied ? <CheckIcon className="w-5 h-5 text-green-500 dark:text-green-400" /> : <CopyIcon className="w-5 h-5" />}
            </button>
      </div>
    );
  };
  
  return (
    <div className="glass-card rounded-xl p-6 h-[32rem] flex flex-col">
       <h2 className="block text-lg font-semibold mb-2 text-primary flex-shrink-0">Optimized Result</h2>
       <div className="flex-grow min-h-0">
         {renderContent()}
       </div>
    </div>
  );
};