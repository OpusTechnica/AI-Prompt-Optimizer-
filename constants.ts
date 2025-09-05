import { OptimizationStyle } from './types';

interface StyleOption {
  label: string;
  style: OptimizationStyle;
  description: string;
}

export const OPTIMIZATION_STYLES: StyleOption[] = [
  { 
    label: 'Detailed', 
    style: OptimizationStyle.DETAILED,
    description: 'Expands on the original prompt with more context and examples.'
  },
  { 
    label: 'Concise', 
    style: OptimizationStyle.CONCISE,
    description: 'Distills the prompt to its essential elements for clarity.'
  },
  { 
    label: 'Professional', 
    style: OptimizationStyle.PROFESSIONAL,
    description: 'Reframes the prompt in a formal, business-appropriate tone.'
  },
  { 
    label: 'Creative', 
    style: OptimizationStyle.CREATIVE,
    description: 'Adds imaginative and artistic flair to the original prompt.'
  },
  { 
    label: 'JSON Request', 
    style: OptimizationStyle.JSON,
    description: 'Structures the prompt to explicitly ask for a JSON output.'
  },
  { 
    label: 'App Dev', 
    style: OptimizationStyle.APP_DEV,
    description: 'Structures prompts for generating code or ideas for web and mobile apps.'
  },
];

export interface ExamplePrompt {
  title: string;
  prompt: string;
  style: OptimizationStyle;
}

export const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  {
    title: 'Blog Post Idea',
    prompt: 'Write a blog post about the benefits of remote work.',
    style: OptimizationStyle.DETAILED,
  },
  {
    title: 'Summarize Text',
    prompt: 'Summarize the main points of the attached article about climate change into three key bullet points for a busy executive.',
    style: OptimizationStyle.CONCISE,
  },
  {
    title: 'Email to Client',
    prompt: 'email to client about project delay',
    style: OptimizationStyle.PROFESSIONAL,
  },
  {
    title: 'Story Writing',
    prompt: 'A robot who discovers music for the first time.',
    style: OptimizationStyle.CREATIVE,
  },
  {
    title: 'API Data Structure',
    prompt: 'I need user data: name, email, and last login date.',
    style: OptimizationStyle.JSON,
  },
  {
    title: 'React Component',
    prompt: 'Create a simple login form component using React and Tailwind CSS.',
    style: OptimizationStyle.APP_DEV,
  },
];