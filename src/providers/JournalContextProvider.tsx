import {
  CalendarJournalProvider,
  GlobalJournalProvider,
  StatisticJournalProvider,
  WeekJournalProvider,
} from '@/store/contexts/JournalContext';
import { PropsWithChildren } from 'react';

export const JournalContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <GlobalJournalProvider>
      <StatisticJournalProvider>
        <CalendarJournalProvider>
          <WeekJournalProvider>{children}</WeekJournalProvider>
        </CalendarJournalProvider>
      </StatisticJournalProvider>
    </GlobalJournalProvider>
  );
};
