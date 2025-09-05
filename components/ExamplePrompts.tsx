import React from 'react';
import { EXAMPLE_PROMPTS, OPTIMIZATION_STYLES } from '../constants';
import { OptimizationStyle } from '../types';

interface ExamplePromptsProps {
  setPrompt: (prompt: string) => void;
  setSelectedStyle: (style: OptimizationStyle) => void;
}

const UseExampleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);


export const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ setPrompt, setSelectedStyle }) => {
  
  const handleUseExample = (prompt: string, style: OptimizationStyle) => {
    setPrompt(prompt);
    setSelectedStyle(style);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="opacity-0 animate-fade-in animation-delay-400">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Inspiration</h2>
        <p className="mt-2 text-lg text-secondary">Not sure where to start? Try one of these examples.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXAMPLE_PROMPTS.map((example, index) => {
          const styleInfo = OPTIMIZATION_STYLES.find(s => s.style === example.style);
          return (
            <div key={index} className="glass-card rounded-xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1">
              <div>
                <span className="category-tag inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                  {example.style}
                </span>
                <h3 className="text-lg font-semibold text-primary mb-2">{example.title}</h3>
                <p className="text-secondary text-sm font-light italic mb-4">"{example.prompt}"</p>
                {styleInfo && (
                  <p className="text-tertiary text-xs">{styleInfo.description}</p>
                )}
              </div>
              <button
                onClick={() => handleUseExample(example.prompt, example.style)}
                className="mt-6 w-full flex items-center justify-center gap-2 font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-blue-500 btn-secondary-fill"
                aria-label={`Use example: ${example.title}`}
              >
                <UseExampleIcon className="w-5 h-5" />
                Use this Example
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
};