import { IJournal } from '@/types/entries';
import { DiaryStore } from '@/types/interfaces';
import { createContext, PropsWithChildren, useState } from 'react';

export const DiaryContext = createContext<DiaryStore>({
  journals: [],
  addJournal: (journal: IJournal) => {},
  removeJournal: (id: string) => {},
});

function DiaryContextProvider({ children }: PropsWithChildren) {
  const [journals, setJournals] = useState<IJournal[]>([]);

  const addJournal = (journal: IJournal) => {
    if (!journals) {
      return setJournals([journal]);
    }
    setJournals(prev => [...prev, journal]);
  };

  const removeJournal = (id: string) => {
    const nextJournals = journals.filter(journal => journal.id !== id);
    setJournals(prev => nextJournals);
  };

  const state = {
    journals,
    addJournal,
    removeJournal,
  };
  return (
    <DiaryContext.Provider value={state}>{children}</DiaryContext.Provider>
  );
}

export default DiaryContextProvider;
