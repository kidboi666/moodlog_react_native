import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IJournalStore } from '@/types/interfaces';
import { IDraft, IEmotion, IJournal } from '@/types/entries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uuid } from 'expo-modules-core';

export const JournalContext = createContext<IJournalStore | null>(null);

export const JournalContextProvider = ({ children }: PropsWithChildren) => {
  const [journals, setJournals] = useState<IJournal[]>([]);
  const [draft, setDraft] = useState<IDraft>({});

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

  const addJournal = useCallback((draft: IDraft) => {
    if (draft.content && draft.emotion && draft.localDate) {
      const newJournal = {
        id: uuid.v4(),
        content: draft.content,
        emotion: draft.emotion,
        createdAt: new Date().toISOString(),
        localDate: draft.localDate,
      };
      setJournals(prev => [...prev, newJournal]);
      setDraft({});
    }
  }, []);

  const removeJournal = useCallback((id: string) => {
    setJournals(prev => prev.filter(journal => journal.id !== id));
  }, []);

  const updateJournals = useCallback((id: string, newJournal: IJournal) => {
    setJournals(prev =>
      prev.map(journal => (journal.id === id ? newJournal : journal)),
    );
  }, []);

  const updateDraftLocalDate = useCallback((date: string) => {
    setDraft(prev => ({ ...prev, localDate: date }));
  }, []);

  const updateDraftEmotion = useCallback((emotion: IEmotion) => {
    setDraft(prev => ({ ...prev, emotion }));
  }, []);

  const updateDraftContent = useCallback((content: string) => {
    setDraft(prev => ({ ...prev, content }));
  }, []);

  return (
    <JournalContext.Provider
      value={{
        journals,
        draft,
        addJournal,
        removeJournal,
        updateJournals,
        updateDraftLocalDate,
        updateDraftEmotion,
        updateDraftContent,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};
