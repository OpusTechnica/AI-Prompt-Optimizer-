import React from 'react';
import { OptimizationStyle } from '../types';

interface StyleOption {
  label: string;
  style: OptimizationStyle;
  description: string;
}

interface StyleSelectorProps {
  styles: StyleOption[];
  selectedStyle: OptimizationStyle;
  onSelect: (style: OptimizationStyle) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {styles.map((option) => (
        <button
          key={option.style}
          onClick={() => onSelect(option.style)}
          title={option.description}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 border
            ${
              selectedStyle === option.style
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent ring-2 ring-blue-500/50'
                : 'btn-secondary-outline'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};