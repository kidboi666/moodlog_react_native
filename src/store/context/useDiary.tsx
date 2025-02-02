import { IJournal } from '@/types/entries';
import { IDiaryStore } from '@/types/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const DiaryContext = createContext<IDiaryStore | null>(null);

const DiaryContextProvider = ({ children }: PropsWithChildren) => {
  const [journals, setJournals] = useState<IJournal[]>([]);

  useEffect(() => {
    const loadJournals = async () => {
      try {
        const savedJournals = await AsyncStorage.getItem('journals-storage');
        if (savedJournals) {
          setJournals(JSON.parse(savedJournals));
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  useEffect(() => {
    const saveJournals = async () => {
      try {
        await AsyncStorage.setItem(
          'journals-storage',
          JSON.stringify(journals),
        );
      } catch (error) {
        console.log(error);
      }
    };
    saveJournals();
  }, [journals]);

  const addJournal = useCallback((journal: IJournal) => {
    setJournals(prev => [...prev, journal]);
  }, []);

  const removeJournal = useCallback((id: string) => {
    setJournals(prev => prev.filter(journal => journal.id !== id));
  }, []);

  const updateJournal = useCallback((id: string, updateJournal: IJournal) => {
    setJournals(prev =>
      prev.map(journal => (journal.id === id ? updateJournal : journal)),
    );
  }, []);

  const state = useMemo(
    () => ({
      journals,
      addJournal,
      removeJournal,
      updateJournal,
    }),
    [addJournal, journals, removeJournal, updateJournal],
  );
  return (
    <DiaryContext.Provider value={state}>{children}</DiaryContext.Provider>
  );
};

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error('useDiary must be used within a DiaryProvider');
  }
  return context;
};

export default DiaryContextProvider;
