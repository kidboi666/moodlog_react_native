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
import { EmotionLevel } from 'src/types/enums';

export const StatisticsContext = createContext<Nullable<StatisticsStore>>(null);

export const StatisticsContextProvider = ({ children }: PropsWithChildren) => {
  const { journals } = useJournal();
  const toast = useToastController();
  const { selectedYear } = useDate();
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
    const signatureEmotion = getSignatureEmotion(scoreBoard);
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
    };
    loadStats();
  }, [journals, selectedYear]);

  useEffect(() => {
    let isMounted = true;
    const saveStats = async () => {
      if (!journalStats.totalCount) return;
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
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    saveStats();
    return () => {
      isMounted = false;
    };
  }, [journalStats, emotionStats]);

  useEffect(() => {
    const updateStats = () => {
      const newJournalStats = getJournalStats();
      const newEmotionStats = getEmotionStats();

      setJournalStats(prev => {
        if (prev.totalCount !== newJournalStats.totalCount) {
          return newJournalStats;
        }
        return prev;
      });

      setEmotionStats(prev => {
        const isScoreBoardChanged =
          JSON.stringify(newEmotionStats.scoreBoard) !==
          JSON.stringify(prev.scoreBoard);
        const isSignatureEmotionChanged =
          newEmotionStats.signatureEmotion.type !== prev.signatureEmotion.type;

        if (isScoreBoardChanged || isSignatureEmotionChanged) {
          console.log('새로운 감정 통계:', newEmotionStats);
          return newEmotionStats;
        }
        return prev;
      });
    };
    updateStats();
  }, [journals, selectedYear, emotionStats, journalStats]);
  return (
    <StatisticsContext.Provider
      value={{ journalStats, emotionStats, isLoading }}
    >
      {children}
    </StatisticsContext.Provider>
  );
};
