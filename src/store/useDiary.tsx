import { IEmotion, IJournal } from '@/types/entries';
import { IDiaryStore } from '@/types/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const DiaryContext = createContext<IDiaryStore | null>(null);

export const DiaryContextProvider = ({ children }: PropsWithChildren) => {
  const [journals, setJournals] = useState<IJournal[]>([]);
  const [draftJournal, setDraftJournal] = useState<IJournal>({
    id: '',
    createdAt: '',
    content: '',
    emotion: {
      type: null,
      level: null,
    },
    keywords: [],
  });

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
    loadJournals();
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

  const addJournal = useCallback((newJournal: IJournal) => {
    setJournals(prev => [...prev, newJournal]);
  }, []);

  const removeJournal = useCallback((id: string) => {
    setJournals(prev => prev.filter(journal => journal.id !== id));
  }, []);

  const updateJournals = useCallback((id: string, newJournal: IJournal) => {
    setJournals(prev =>
      prev.map(journal => (journal.id === id ? newJournal : journal)),
    );
  }, []);

  const updateDraftEmotion = useCallback((emotion: IEmotion) => {
    setDraftJournal(prev => ({ ...prev, emotion }));
  }, []);

  const updateDraftContent = useCallback((content: string) => {
    setDraftJournal(prev => ({ ...prev, content: content }));
  }, []);

  return (
    <DiaryContext.Provider
      value={{
        journals,
        draftJournal,
        addJournal,
        removeJournal,
        updateJournals,
        updateDraftEmotion,
        updateDraftContent,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error('useDiary must be used within a DiaryProvider');
  }
  return context;
};
