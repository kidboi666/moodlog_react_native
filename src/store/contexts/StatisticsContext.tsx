import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { useDate } from '@/store/hooks/useDate';
import { StatisticsStore } from '@/types/store';
import { Nullable } from '@/types/utils';
import { MONTHS } from '@/constants/date';
import {
  EmotionStats,
  ExpressiveMonthStats,
  Journal,
  JournalStats,
  MonthlyStats,
  ScoreBoard,
  SignatureEmotion,
} from '@/types/entries';
import { EmotionLevel } from 'src/types/enums';
import { getDayInISODateString, getMonthInISODateString } from '@/utils/common';
import { ISOMonthString } from '@/types/dtos/date';

export const StatisticsContext = createContext<Nullable<StatisticsStore>>(null);

export const StatisticsContextProvider = ({ children }: PropsWithChildren) => {
  const { journals, monthlyJournals } = useJournal();
  const { selectedYear, selectedMonth, currentYear, currentMonth } = useDate();
  const [isLoading, setIsLoading] = useState(false);
  const [journalStats, setJournalStats] = useState<JournalStats>({
    totalCount: 0,
    totalFrequency: 0,
    totalActiveDay: '',
    monthlyCounts: {},
  });
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({
    month: '0000-00',
    count: 0,
    frequency: 0,
    activeDay: '',
  });
  const [expressiveMonth, setExpressiveMonth] = useState<ExpressiveMonthStats>({
    month: '0000-00',
    count: 0,
  });
  const [emotionStats, setEmotionStats] = useState<EmotionStats>({
    signatureEmotion: {
      type: '',
      count: 0,
      score: 0,
    },
    scoreBoard: {
      sad: {
        count: 0,
        score: 0,
      },
      angry: {
        count: 0,
        score: 0,
      },
      happy: {
        count: 0,
        score: 0,
      },
      peace: {
        count: 0,
        score: 0,
      },
    },
  });

  /**
   * 작성한 모든 일기의 갯수 가져오기
   */
  const getTotalCount = () => {
    return journals.length;
  };

  /**
   * 각 달마다 작성한 일기의 갯수 가져오기
   */
  const getMonthlyCounts = () => {
    return Object.fromEntries(
      Array.from({ length: Object.keys(MONTHS).length }, (_, i) => {
        const date =
          `${selectedYear}-${(i + 1).toString().padStart(2, '0')}` as ISOMonthString;
        return [
          date,
          journals.filter(journal => journal.localDate.startsWith(date)).length,
        ];
      }),
    );
  };

  /**
   * 가장 많은 일기를 작성한 달과 갯수 가져오기
   */
  const getExpressiveMonth = () => {
    const monthlyCounts = getMonthlyCounts();
    return Object.entries(monthlyCounts).reduce(
      (highest, [month, count]) => {
        if (count > highest.count) {
          return { month, count };
        }
        return highest;
      },
      { month: '', count: 0 },
    );
  };

  /**
   * 감정 평균 구하기
   */
  const getTotalEmotionAverage = () => {
    const emotions = journals.map(journal => journal.emotion);

    const scoreBoard: ScoreBoard = {
      sad: { count: 0, score: 0 },
      angry: { count: 0, score: 0 },
      happy: { count: 0, score: 0 },
      peace: { count: 0, score: 0 },
    };

    emotions.forEach(emotion => {
      switch (emotion.level) {
        case EmotionLevel.ZERO: {
          scoreBoard[emotion.type] = {
            count: scoreBoard[emotion.type].count + 1,
            score: scoreBoard[emotion.type].score + 1,
          };
          return;
        }
        case EmotionLevel.HALF: {
          scoreBoard[emotion.type] = {
            count: scoreBoard[emotion.type].count + 1,
            score: scoreBoard[emotion.type].score + 2,
          };
          return;
        }
        case EmotionLevel.FULL: {
          scoreBoard[emotion.type] = {
            count: scoreBoard[emotion.type].count + 1,
            score: scoreBoard[emotion.type].score + 3,
          };
          return;
        }
        default:
          return;
      }
    });

    return scoreBoard;
  };

  /**
   * 대표 감정 가져오기
   */
  const getSignatureEmotion = (scoreBoard: ScoreBoard) => {
    const initialValue: SignatureEmotion = {
      type: '',
      count: 0,
      score: 0,
    };
    return Object.entries(scoreBoard).reduce((highest, [type, data]) => {
      if (!highest.type || data.score > highest.score) {
        return {
          type,
          count: data.count,
          score: data.score,
        };
      }
      return highest;
    }, initialValue);
  };

  /**
   * 일기 작성 빈도 가져오기
   */
  const getJournalFrequency = (Journals: Journal[]) => {
    const dates = Journals.map(journal =>
      parseInt(journal.localDate.split('-')[2]),
    ).sort((a, b) => a - b);
    let frequency: Record<string, number> = {};

    if (dates.length === 0) return 0;

    dates.reduce((acc, date) => {
      const diffNum = date - acc;
      if (diffNum !== 0) {
        frequency[diffNum] = (frequency[diffNum] || 0) + 1;
      }
      return date;
    }, dates[0]);

    if (Object.keys(frequency).length === 0) return 0;

    return parseInt(
      Object.entries(frequency).reduce(
        (acc, [num, count]) => (count > frequency[acc] ? num : acc),
        Object.keys(frequency)[0],
      ),
    );
  };

  /**
   * 가장 자주 일기를 작성한 요일 가져오기
   */
  const getMostActiveDay = (Journals: Journal[]) => {
    const days = Journals.map(journal =>
      getDayInISODateString(journal.localDate),
    );
    const frequency: Record<string, number> = {};

    days.forEach(day => {
      frequency[day] = (frequency[day] || 0) + 1;
    });

    return Object.entries(frequency).reduce(
      (acc, [day, count]) => (count > frequency[acc] ? day : acc),
      Object.keys(frequency)[0],
    );
  };

  /**
   * 초기화
   */
  const getJournalStats = () => {
    const totalCount = getTotalCount();
    const monthlyCounts = getMonthlyCounts();
    const totalFrequency = getJournalFrequency(journals);
    const totalActiveDay = getMostActiveDay(journals);
    setJournalStats({
      totalFrequency,
      totalActiveDay,
      totalCount,
      monthlyCounts,
    });
  };

  const getMonthlyStats = () => {
    const currentFrequency = getJournalFrequency(monthlyJournals);
    const currentActiveDay = getMostActiveDay(monthlyJournals);
    setMonthlyStats({
      month: getMonthInISODateString(currentYear, currentMonth + 1),
      count: monthlyJournals.length,
      frequency: currentFrequency,
      activeDay: currentActiveDay,
    });
  };

  const getExpressiveMonthStats = () => {
    const expressiveMonth = getExpressiveMonth();
    setExpressiveMonth({
      month: expressiveMonth.month as ISOMonthString,
      count: expressiveMonth.count,
    });
  };

  const getEmotionStats = () => {
    const scoreBoard = getTotalEmotionAverage();
    const signatureEmotion = getSignatureEmotion(scoreBoard);
    setEmotionStats({
      scoreBoard,
      signatureEmotion,
    });
  };

  useEffect(() => {
    if (selectedYear) {
      getJournalStats();
      getEmotionStats();
      getExpressiveMonthStats();
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedMonth) {
      getMonthlyStats();
    }
  }, [selectedMonth]);

  // useEffect(() => {
  //   const loadStats = async () => {
  //     try {
  //       setIsLoading(true);
  //       const journalStatsData = await AsyncStorage.getItem(
  //         STORAGE_KEY.JOURNALS_STATS,
  //       );
  //       const emotionStatsData = await AsyncStorage.getItem(
  //         STORAGE_KEY.EMOTION_STATS,
  //       );
  //
  //       if (journalStatsData && emotionStatsData) {
  //         setJournalStats(JSON.parse(journalStatsData));
  //         setEmotionStats(JSON.parse(emotionStatsData));
  //         return;
  //       }
  //
  //       setJournalStats(getJournalStats());
  //       setEmotionStats(getEmotionStats());
  //     } catch (err) {
  //       console.error('Load error:', err);
  //       toast.show('Error loading journals count', {
  //         message: 'Please try again later',
  //         type: 'error',
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   loadStats();
  // }, [journals, selectedYear]);
  //
  // useEffect(() => {
  //   let isMounted = true;
  //   const saveStats = async () => {
  //     if (!journalStats.totalCount) return;
  //     try {
  //       setIsLoading(true);
  //       await AsyncStorage.setItem(
  //         STORAGE_KEY.JOURNALS_STATS,
  //         JSON.stringify(journalStats),
  //       );
  //       await AsyncStorage.setItem(
  //         STORAGE_KEY.EMOTION_STATS,
  //         JSON.stringify(emotionStats),
  //       );
  //     } catch (err) {
  //       console.error('Save error:', err);
  //       toast.show('Error saving journals count', {
  //         message: 'Please try again later',
  //         type: 'error',
  //       });
  //     } finally {
  //       if (isMounted) {
  //         setIsLoading(false);
  //       }
  //     }
  //   };
  //
  //   saveStats();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [journalStats, emotionStats]);
  //
  // useEffect(() => {
  //   const updateStats = () => {
  //     const newJournalStats = getJournalStats();
  //     const newEmotionStats = getEmotionStats();
  //
  //     setJournalStats(prev => {
  //       if (prev.totalCount !== newJournalStats.totalCount) {
  //         return newJournalStats;
  //       }
  //       return prev;
  //     });
  //
  //     setEmotionStats(prev => {
  //       const isScoreBoardChanged =
  //         JSON.stringify(newEmotionStats?.scoreBoard) !==
  //         JSON.stringify(prev?.scoreBoard);
  //       const isSignatureEmotionChanged =
  //         newEmotionStats?.signatureEmotion.type !==
  //         prev?.signatureEmotion.type;
  //
  //       if (isScoreBoardChanged || isSignatureEmotionChanged) {
  //         return newEmotionStats;
  //       }
  //       return prev;
  //     });
  //   };
  //   updateStats();
  // }, [journals, selectedYear]);

  return (
    <StatisticsContext.Provider
      value={{ journalStats, emotionStats, isLoading }}
    >
      {children}
    </StatisticsContext.Provider>
  );
};
