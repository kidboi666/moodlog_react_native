import { createContext, PropsWithChildren, useState } from 'react';
import { DateStore } from '@/types/store';
import { Nullable } from '@/types/utils';
import { ISODateString, ISOMonthString } from '@/types/dtos/date';
import { CalendarUtils } from 'react-native-calendars';
import { getMonthInISODateString } from '@/utils/common';
import { ContextName } from '@/types/enums';

export const CreateDateContext = (contextName: ContextName) => {
  const Context = createContext<Nullable<DateStore>>(null);

  Context.displayName = `${contextName}DateContext`;

  const Provider = ({ children }: PropsWithChildren) => {
    const [currentYear] = useState(new Date().getFullYear());
    const [currentMonth] = useState(new Date().getMonth());
    const [currentDate] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState<ISOMonthString>(
      getMonthInISODateString(currentYear, currentMonth),
    );
    const [selectedDate, setSelectedDate] = useState<ISODateString>(
      CalendarUtils.getCalendarDateString(currentDate),
    );

    const handleSelectedYearChange = (year: number) => {
      setSelectedYear(year);
    };

    const handleSelectedMonthChange = (month: ISOMonthString) => {
      setSelectedMonth(month);
    };

    const handleSelectedDateChange = (date: ISODateString) => {
      setSelectedDate(date);
    };

    const initSelectedDates = () => {
      setSelectedDate(CalendarUtils.getCalendarDateString(currentDate));
      setSelectedMonth(getMonthInISODateString(currentYear, currentMonth));
      setSelectedYear(currentYear);
    };

    return (
      <Context.Provider
        value={{
          currentMonth,
          currentYear,
          currentDate,
          selectedYear,
          selectedMonth,
          selectedDate,
          initSelectedDates,
          onSelectedYearChange: handleSelectedYearChange,
          onSelectedMonthChange: handleSelectedMonthChange,
          onSelectedDateChange: handleSelectedDateChange,
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  return {
    Provider,
    Context,
  };
};

export const { Provider: CalendarDateProvider, Context: CalendarDateContext } =
  CreateDateContext('calendar');
export const { Provider: WeekDateProvider, Context: WeekDateContext } =
  CreateDateContext('week');
export const {
  Provider: StatisticDateProvider,
  Context: StatisticDateContext,
} = CreateDateContext('statistic');
export const { Provider: GlobalDateProvider, Context: GlobalDateContext } =
  CreateDateContext('global');
