import { PropsWithChildren } from 'react';
import {
  EntriesDateProvider,
  GlobalDateProvider,
  StatisticDateProvider,
  WeekDateProvider,
} from '@/store/contexts/DateContext';

export const DateContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <GlobalDateProvider>
      <StatisticDateProvider>
        <EntriesDateProvider>
          <WeekDateProvider>{children}</WeekDateProvider>
        </EntriesDateProvider>
      </StatisticDateProvider>
    </GlobalDateProvider>
  );
};
