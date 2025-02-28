import { Nullable } from '@/types/utils';
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
  const [isLoading, setIsLoading] = useState(false);
  const { journals, getJournalsByMonth } = useJournal();
  const { selectedYear, onSelectedMonthChange } = useDate();
  const [monthlyJournals, setMonthlyJournals] = useState();

  const months = useMemo(
    () =>
      Object.keys(MONTHS).map(month => ({
        monthString: month,
        lastDate: getLastDate(selectedYear, month),
        firstDateDay: getFirstDateDay(selectedYear, month),
        weekLength: getWeekLength(selectedYear, month),
      })),
    [selectedYear],
  );

  const handleMonthChange = (ISOMonth: string) => {
    onSelectedMonthChange(getMonthInISODateString(selectedYear, ISOMonth));
    getJournalsByMonth(
      getMonthInISODateString(selectedYear, Number(ISOMonth + 1)),
    );
  };

  return (
    <GardenContext.Provider
      value={{ isLoading, months, onMonthChange: handleMonthChange }}
    >
      {children}
    </GardenContext.Provider>
  );
};
