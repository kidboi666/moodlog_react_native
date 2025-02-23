import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { JournalStore } from 'src/types/store';
import { DateCounts, Draft, Emotion, Journal } from '@/types/entries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uuid } from 'expo-modules-core';
import { useToastController } from '@tamagui/toast';
import { useRouter } from 'expo-router';
import { ISODateString, ISOMonthString } from '@/types/dtos/date';
import { Nullable } from '@/types/utils';
import { STORAGE_KEY } from '@/constants/storage';
import { CalendarUtils } from 'react-native-calendars';
import { MONTHS } from '@/constants/date';
import { useDate } from '@/store/hooks/useDate';
import { useTranslation } from 'react-i18next';

export const JournalContext = createContext<Nullable<JournalStore>>(null);

export const JournalContextProvider = ({ children }: PropsWithChildren) => {
  const { selectedYear, selectedMonth } = useDate();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [yearlyJournals, setYearlyJournals] = useState<Journal[]>([]);
  const [monthlyJournals, setMonthlyJournals] = useState<Journal[]>([]);
  const [selectedJournals, setSelectedJournals] = useState<Journal[]>([]);
  const [draft, setDraft] = useState<Draft>({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToastController();
  const router = useRouter();
  const { t } = useTranslation();

  const addJournal = useCallback((draft: Draft) => {
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

      toast.show(t('toast.success.journal.title'), {
        message: t('toast.success.journal.message'),
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
      const counts: DateCounts = {};

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

  const updateJournals = useCallback((id: string, newJournal: Journal) => {
    setJournals(prev =>
      prev.map(journal => (journal.id === id ? newJournal : journal)),
    );
  }, []);

  const updateDraftLocalDate = useCallback((date: ISODateString) => {
    setDraft(prev => ({ ...prev, localDate: date }));
  }, []);

  const updateDraftEmotion = useCallback((emotion: Emotion) => {
    setDraft(prev => ({ ...prev, emotion }));
  }, []);

  const updateDraftContent = useCallback((content: string) => {
    setDraft(prev => ({ ...prev, content }));
  }, []);

  const updateDraftTitle = useCallback((title: string) => {
    setDraft(prev => ({ ...prev, title }));
  }, []);

  const getJournalsByDate = useCallback(
    (date: ISODateString) => {
      const selectedJournals =
        journals.filter(journal => journal.localDate === date) || [];
      setSelectedJournals(selectedJournals);
    },
    [journals],
  );

  const getJournalsByMonth = (date: ISOMonthString) => {
    const selectedJournals = journals.filter(journal =>
      journal.localDate.startsWith(date),
    );
    setMonthlyJournals(selectedJournals);
  };

  const getJournalsByYear = (year: number) => {
    const selectedJournals = journals.filter(journal =>
      journal.localDate.startsWith(year.toString()),
    );
    setYearlyJournals(selectedJournals);
  };

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

        if (!Array.isArray(journals)) return null;

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
      getJournalsByDate(CalendarUtils.getCalendarDateString(new Date()));
    };

    if (journals.length >= 0 && !isLoading) {
      initializeSelectedJournals();
    }
  }, [journals, isLoading, getJournalsByDate]);

  return (
    <JournalContext.Provider
      value={{
        journals,
        selectedJournals,
        monthlyJournals,
        yearlyJournals,
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
        getJournalsByDate,
        getJournalsByMonth,
        getJournalsByYear,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};
