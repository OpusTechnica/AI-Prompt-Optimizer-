export enum OptimizationStyle {
  DETAILED = 'More Detailed',
  CONCISE = 'More Concise',
  PROFESSIONAL = 'Professional Tone',
  CREATIVE = 'More Creative',
  JSON = 'Format as JSON Request',
  APP_DEV = 'Web & App Development'
}

export interface HistoryItem {
  id: string;
  originalPrompt: string;
  optimizationStyle: OptimizationStyle;
  optimizedPrompt: string;
  timestamp: number;
}