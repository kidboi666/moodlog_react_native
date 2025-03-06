import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
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
    const currentDate = useMemo(() => new Date(), []);
    const currentYear = useMemo(() => currentDate.getFullYear(), [currentDate]);
    const currentMonth = useMemo(() => currentDate.getMonth(), [currentDate]);

    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] =
      useState<Nullable<ISOMonthString>>(null);
    const [selectedDate, setSelectedDate] = useState<ISODateString>(
      CalendarUtils.getCalendarDateString(currentDate),
    );

    const handleSelectedYearChange = useCallback((year: number) => {
      setSelectedYear(year);
    }, []);

    const handleSelectedMonthChange = useCallback(
      (month: Nullable<ISOMonthString>) => {
        setSelectedMonth(month);
      },
      [],
    );

    const handleSelectedDateChange = useCallback((date: ISODateString) => {
      setSelectedDate(date);
    }, []);

    const initSelectedDates = useCallback(() => {
      setSelectedDate(CalendarUtils.getCalendarDateString(currentDate));
      setSelectedMonth(getMonthInISODateString(currentYear, currentMonth));
      setSelectedYear(currentYear);
    }, [currentDate, currentMonth, currentYear]);

    return (
      <Context.Provider
        value={useMemo(
          () => ({
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
          }),
          [
            currentMonth,
            currentYear,
            currentDate,
            selectedYear,
            selectedMonth,
            selectedDate,
            initSelectedDates,
            handleSelectedYearChange,
            handleSelectedMonthChange,
            handleSelectedDateChange,
          ],
        )}
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
