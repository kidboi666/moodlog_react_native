import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IJournalStore } from 'src/types/store';
import { IDateCounts, IDraft, IEmotion, IJournal } from '@/types/entries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uuid } from 'expo-modules-core';
import { useToastController } from '@tamagui/toast';
import { useRouter } from 'expo-router';
import { ISODateString } from '@/types/dtos/date';
import { Nullable } from '@/types/utils';

export const JournalContext = createContext<Nullable<IJournalStore>>(null);

export const JournalContextProvider = ({ children }: PropsWithChildren) => {
  const [journals, setJournals] = useState<IJournal[]>([]);
  const [selectedJournals, setSelectedJournals] = useState<IJournal[]>([]);
  const [draft, setDraft] = useState<IDraft>({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToastController();
  const router = useRouter();

  const addJournal = useCallback((draft: IDraft) => {
    if (draft.content && draft.emotion && draft.localDate && draft.title) {
      const newJournal = {
        id: uuid.v4(),
        title: draft.title,
        content: draft.content,
        emotion: draft.emotion,
        createdAt: new Date().toISOString(),
        localDate: draft.localDate,
      };

      setJournals(prev => [...prev, newJournal]);
      setDraft({});

      toast.show('Successfully saved!', {
        message: 'Save Journal!',
      });
      router.replace('/');
    }
  }, []);

  const getDateCountsForMonth = useCallback(
    (year: number, month: number) => {
      const lastDay = new Date(year, month, 0).getDate();
      const counts: IDateCounts = {};

      for (let day = 1; day <= lastDay; day++) {
        const dateKey = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        counts[dateKey] = 0;
      }

      journals.forEach(journal => {
        if (counts.hasOwnProperty(journal.localDate)) {
          counts[journal.localDate]++;
        }
      });

      return counts;
    },
    [journals],
  );

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

  const updateDraftTitle = useCallback((title: string) => {
    setDraft(prev => ({ ...prev, title }));
  }, []);

  const updateSelectedJournals = useCallback(
    (date: ISODateString) => {
      const selectedJournals =
        journals.filter(journal => journal.localDate === date) || [];
      setSelectedJournals(selectedJournals);
    },
    [journals],
  );

  useEffect(() => {
    const loadJournals = async () => {
      try {
        setIsLoading(true);
        const savedJournals = await AsyncStorage.getItem('journals-storage');
        if (savedJournals) {
          setJournals(JSON.parse(savedJournals));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    void loadJournals();
  }, []);

  useEffect(() => {
    const saveJournals = async () => {
      try {
        setIsLoading(true);
        await AsyncStorage.setItem(
          'journals-storage',
          JSON.stringify(journals),
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    void saveJournals();
  }, [journals]);

  return (
    <JournalContext.Provider
      value={{
        journals,
        selectedJournals,
        draft,
        addJournal,
        isLoading,
        getDateCountsForMonth,
        removeJournal,
        updateJournals,
        updateDraftLocalDate,
        updateDraftEmotion,
        updateDraftContent,
        updateDraftTitle,
        updateSelectedJournals,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};
