import { PropsWithChildren } from 'react';
import {
  CalendarDateProvider,
  GlobalDateProvider,
  StatisticDateProvider,
  WeekDateProvider,
} from '@/store/contexts/DateContext';

export const DateContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <GlobalDateProvider>
      <StatisticDateProvider>
        <CalendarDateProvider>
          <WeekDateProvider>{children}</WeekDateProvider>
        </CalendarDateProvider>
      </StatisticDateProvider>
    </GlobalDateProvider>
  );
};
