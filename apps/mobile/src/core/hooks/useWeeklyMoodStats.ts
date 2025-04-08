import { useMemo } from 'react';

import { StatisticsService } from '@/core/services/statistics.service';
import { useJournal } from '@/core/store/journal.store';

import { ISODateString } from '@/types/date.types';

export const useWeeklyMoodStats = (selectedDate: ISODateString) => {
  const journals = useJournal(state => state.store.journals);
  const indexes = useJournal(state => state.store.indexes);

  const weeklyMoodStats = useMemo(
    () => StatisticsService.getWeeklyStats(journals, indexes, selectedDate),
    [journals, indexes, selectedDate],
  );

  return {
    stats: weeklyMoodStats,
  };
};
