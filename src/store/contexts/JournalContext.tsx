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
import { STORAGE_KEY } from '@/constants/storage';
import { CalendarUtils } from 'react-native-calendars';
import { MONTHS } from '@/constants/date';

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

  const getDateCountsForDate = (
    year: number,
    month: number | string,
    date: number,
  ) => {
    let intMonth: number;
    if (typeof month === 'string') {
      intMonth = Object.keys(MONTHS).findIndex(key => key === month) + 1;
    } else {
      intMonth = month;
    }

    const dateString = `${year}-${(intMonth + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
    const foundJournals = journals.filter(
      journal => journal.localDate === dateString,
    );
    console.log(dateString);
    return foundJournals.length;
  };

  const getDateCountsForMonth = useCallback(
    (year: number, month: number | string) => {
      let intMonth: number;
      if (typeof month === 'string') {
        intMonth = Object.keys(MONTHS).findIndex(key => key === month) + 1;
      } else {
        intMonth = month;
      }
      const lastDay = new Date(year, intMonth, 0).getDate();
      const counts: IDateCounts = {};

      for (let day = 1; day <= lastDay; day++) {
        const dateKey = `${year}-${intMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
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

  const updateDraftLocalDate = useCallback((date: ISODateString) => {
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
        const savedJournals = await AsyncStorage.getItem(STORAGE_KEY.JOURNALS);
        if (!savedJournals) {
          const backupJournals = await AsyncStorage.getItem(STORAGE_KEY.BACKUP);
          if (backupJournals) {
            setJournals(JSON.parse(backupJournals));
            toast.show('Restored from backup', {
              message: 'Your data has been restored',
            });
            return;
          }
        }

        setJournals(JSON.parse(savedJournals || '[]'));
      } catch (error) {
        console.error('Load error:', error);
        toast.show('Error loading journals', {
          message: 'Please try again later',
          type: 'error',
        });
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

        if (!Array.isArray(journals)) {
          throw new Error('Journals is not an array');
        }

        await AsyncStorage.setItem(
          STORAGE_KEY.JOURNALS,
          JSON.stringify(journals),
        );

        if (journals.length > 0) {
          await AsyncStorage.setItem(
            STORAGE_KEY.BACKUP,
            JSON.stringify(journals),
          );
        }
      } catch (error) {
        const savedJournals = await AsyncStorage.getItem(STORAGE_KEY.JOURNALS);
        if (savedJournals) {
          setJournals(JSON.parse(savedJournals));
        }

        toast.show('Error saving journals', {
          message: 'Your data has been restored',
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };
    void saveJournals();
  }, [journals]);

  useEffect(() => {
    const initializeSelectedJournals = () => {
      updateSelectedJournals(CalendarUtils.getCalendarDateString(new Date()));
    };

    if (journals.length >= 0 && !isLoading) {
      initializeSelectedJournals();
    }
  }, [journals, isLoading, updateSelectedJournals]);

  return (
    <JournalContext.Provider
      value={{
        journals,
        selectedJournals,
        draft,
        addJournal,
        isLoading,
        getDateCountsForMonth,
        getDateCountsForDate,
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
