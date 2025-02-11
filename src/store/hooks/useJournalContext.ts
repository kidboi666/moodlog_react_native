import { useContext } from 'react';
import { JournalContext } from '@/store/contexts/JournalContext';

export const useJournalContext = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error(
      'useJournalContext must be used within a JournalContextProvider',
    );
  }
  return context;
};
