import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { useDate } from '@/store/hooks/useDate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@/constants/storage';
import { useToastController } from '@tamagui/toast';
import { StatisticsStore } from '@/types/store';
import { Nullable } from '@/types/utils';
import { MONTHS } from '@/constants/date';
import {
  EmotionStats,
  JournalStats,
  ScoreBoard,
  SignatureEmotion,
} from '@/types/entries';
import { EmotionLevel } from '@/types/enums';

export const StatisticsContext = createContext<Nullable<StatisticsStore>>(null);

export const StatisticsContextProvider = ({ children }: PropsWithChildren) => {
  const { journals, selectedJournals, monthlyJournals } = useJournal();
  const toast = useToastController();
  const { selectedYear, selectedMonth } = useDate();
  const [isLoading, setIsLoading] = useState(false);
  const [journalStats, setJournalStats] = useState<JournalStats>({
    totalCount: 0,
    monthlyCounts: {},
    expressiveMonth: {
      month: '',
      count: 0,
    },
  });
  const [emotionStats, setEmotionStats] = useState<EmotionStats>({
    signatureEmotion: {
      type: '',
      average: 0,
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
   * 특정 달의 작성한 일기의 갯수 가져오기
   */
  const getCountByMonth = () => {
    return Object.fromEntries(
      Array.from({ length: Object.keys(MONTHS).length }, (_, i) => {
        const date = `${selectedYear}-${(i + 1).toString().padStart(2, '0')}`;
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
    const monthlyCounts = getCountByMonth();
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

  const getTotalEmotionAverage = () => {
    const emotions = journals.map(journal => journal.emotion);

    const scoreBoard: ScoreBoard = {} as ScoreBoard;

    emotions.forEach(emotion => {
      if (!scoreBoard[emotion.type]) {
        scoreBoard[emotion.type] = { count: 0, score: 0 };
      }
    });

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

  const getSignatureEmotion = () => {
    const scoreBoardData = getTotalEmotionAverage();
    return Object.entries(scoreBoardData).reduce((highest, [type, data]) => {
      if (!highest.type || data.score / data.count > highest.average) {
        return {
          type,
          average: data.score / data.count,
          count: data.count,
          score: data.score,
        };
      }
      return highest;
    }, {} as SignatureEmotion);
  };

  /**
   * 초기화
   */
  const getJournalStats = () => {
    const totalCount = getTotalCount();
    const monthlyCounts = getCountByMonth();
    const expressiveMonth = getExpressiveMonth();
    return {
      totalCount,
      monthlyCounts,
      expressiveMonth,
    };
  };
  const getEmotionStats = () => {
    const scoreBoard = getTotalEmotionAverage();
    const signatureEmotion = getSignatureEmotion();

    return {
      scoreBoard,
      signatureEmotion,
    };
  };

  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        const journalStatsData = await AsyncStorage.getItem(
          STORAGE_KEY.JOURNALS_STATS,
        );
        const emotionStatsData = await AsyncStorage.getItem(
          STORAGE_KEY.EMOTION_STATS,
        );

        if (journalStatsData && emotionStatsData) {
          setJournalStats(JSON.parse(journalStatsData));
          setEmotionStats(JSON.parse(emotionStatsData));
          return;
        }

        setJournalStats(getJournalStats());
        setEmotionStats(getEmotionStats());
      } catch (err) {
        console.error('Load error:', err);
        toast.show('Error loading journals count', {
          message: 'Please try again later',
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
      loadStats();
    };
  }, [journals, selectedYear]);

  useEffect(() => {
    const saveStats = async () => {
      try {
        setIsLoading(true);
        await AsyncStorage.setItem(
          STORAGE_KEY.JOURNALS_STATS,
          JSON.stringify(journalStats),
        );
        await AsyncStorage.setItem(
          STORAGE_KEY.EMOTION_STATS,
          JSON.stringify(emotionStats),
        );
      } catch (err) {
        console.error('Save error:', err);
        toast.show('Error saving journals count', {
          message: 'Please try again later',
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }

      if (journalStats.totalCount > 0) {
        saveStats();
      }
    };
  }, [journalStats]);

  useEffect(() => {
    const updateStats = () => {
      const newJournalStats = getJournalStats();
      const newEmotionStats = getEmotionStats();

      if (newJournalStats.totalCount !== journalStats.totalCount) {
        setJournalStats(newJournalStats);
      }
      if (newEmotionStats.signatureEmotion !== emotionStats.signatureEmotion) {
        setEmotionStats(newEmotionStats);
      }
    };
    updateStats();
  }, [journals]);

  return (
    <StatisticsContext.Provider
      value={{ journalStats, emotionStats, isLoading }}
    >
      {children}
    </StatisticsContext.Provider>
  );
};
