import { createContext, PropsWithChildren, useState } from 'react';
import { DateStore } from '@/types/store';

export const DateContext = createContext<DateStore | null>(null);

export const DateContextProvider = ({ children }: PropsWithChildren) => {
  const [currentYear] = useState(new Date().getFullYear());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(0);

  const handleChangeSelectedYear = (year: number) => {
    setSelectedYear(year);
  };

  const handleChangeSelectedMonth = (month: number) => {
    setSelectedMonth(month);
  };

  return (
    <DateContext.Provider
      value={{
        selectedYear,
        onChangeSelectedYear: handleChangeSelectedYear,
        selectedMonth,
        onChangeSelectedMonth: handleChangeSelectedMonth,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};
