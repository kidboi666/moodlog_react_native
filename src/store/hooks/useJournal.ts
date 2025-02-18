import { useContext } from 'react';
import { JournalContext } from '@/store/contexts/JournalContext';

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalContextProvider');
  }
  return context;
};
