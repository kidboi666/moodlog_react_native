import {
  EntriesJournalProvider,
  GlobalJournalProvider,
  StatisticJournalProvider,
  WeekJournalProvider,
} from '@/store/contexts/JournalContext';
import { PropsWithChildren } from 'react';

export const JournalContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <GlobalJournalProvider>
      <StatisticJournalProvider>
        <EntriesJournalProvider>
          <WeekJournalProvider>{children}</WeekJournalProvider>
        </EntriesJournalProvider>
      </StatisticJournalProvider>
    </GlobalJournalProvider>
  );
};
