import { createContext, PropsWithChildren, useState } from 'react';
import { DateStore } from '@/types/store';
import { Nullable } from '@/types/utils';

export const DateContext = createContext<Nullable<DateStore>>(null);

export const DateContextProvider = ({ children }: PropsWithChildren) => {
  const [currentYear] = useState(new Date().getFullYear());
  const [currentMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(0);

  const handleSelectedYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleSelectedMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  return (
    <DateContext.Provider
      value={{
        currentMonth,
        currentYear,
        selectedYear,
        selectedMonth,
        onSelectedYearChange: handleSelectedYearChange,
        onSelectedMonthChange: handleSelectedMonthChange,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};
