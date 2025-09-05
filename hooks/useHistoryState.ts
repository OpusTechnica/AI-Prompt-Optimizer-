import { useState, useCallback } from 'react';

type HistoryStateReturn<T> = [
  T,
  (newState: T) => void,
  () => void,
  () => void,
  boolean,
  boolean
];

export const useHistoryState = <T>(initialState: T): HistoryStateReturn<T> => {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentState = history[currentIndex];
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const setState = useCallback((newState: T) => {
    if (newState === currentState) {
      return;
    }
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newState);
    
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  }, [history, currentIndex, currentState]);

  const undo = useCallback(() => {
    if (canUndo) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [canRedo]);

  return [currentState, setState, undo, redo, canUndo, canRedo];
};
