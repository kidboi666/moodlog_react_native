import { createContext, PropsWithChildren, useState } from 'react';
import { DateStore } from '@/types/store';
import { Nullable } from '@/types/utils';
import { ISODateString, ISOMonthString } from '@/types/dtos/date';

export const DateContext = createContext<Nullable<DateStore>>(null);

export const DateContextProvider = ({ children }: PropsWithChildren) => {
  const [currentYear] = useState(new Date().getFullYear());
  const [currentMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<ISOMonthString>('0000-00');
  const [selectedDate, setSelectedDate] = useState<ISODateString>('0000-00-00');

  const handleSelectedYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleSelectedMonthChange = (month: ISOMonthString) => {
    setSelectedMonth(month);
  };

  const handleSelectedDateChange = (date: ISODateString) => {
    setSelectedDate(date);
  };

  return (
    <DateContext.Provider
      value={{
        currentMonth,
        currentYear,
        selectedYear,
        selectedMonth,
        selectedDate,
        onSelectedYearChange: handleSelectedYearChange,
        onSelectedMonthChange: handleSelectedMonthChange,
        onSelectedDateChange: handleSelectedDateChange,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};
