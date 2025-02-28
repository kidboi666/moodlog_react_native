import { MonthKey, Nullable } from '@/types/utils';
import { createContext, PropsWithChildren, useMemo, useState } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { MONTHS } from '@/constants/date';
import {
  getFirstDateDay,
  getLastDate,
  getMonthInISODateString,
  getWeekLength,
} from '@/utils/common';
import { useDate } from '@/store/hooks/useDate';
import { GardenStore } from '@/types/store';

export const GardenContext = createContext<Nullable<GardenStore>>(null);

export const GardenContextProvider = ({ children }: PropsWithChildren) => {
  const { journals, getJournalsByMonth } = useJournal();
  const { selectedYear, onSelectedMonthChange } = useDate();
  const [isLoading, setIsLoading] = useState(false);
  const [monthlyJournals, setMonthlyJournals] = useState();

  const months = useMemo(
    () =>
      Object.keys(MONTHS).map(month => ({
        monthKey: month as MonthKey,
        lastDate: getLastDate(selectedYear, month as MonthKey),
        firstDateDay: getFirstDateDay(selectedYear, month),
        weekLength: getWeekLength(selectedYear, month),
      })),
    [selectedYear],
  );

  const handleMonthChange = (ISOMonth: MonthKey) => {
    onSelectedMonthChange(getMonthInISODateString(selectedYear, ISOMonth));
    getJournalsByMonth(getMonthInISODateString(selectedYear, Number(ISOMonth)));
  };

  return (
    <GardenContext.Provider
      value={{ isLoading, months, onMonthChange: handleMonthChange }}
    >
      {children}
    </GardenContext.Provider>
  );
};
