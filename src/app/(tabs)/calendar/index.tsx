import {
  getCountOfNextMonth,
  getCountOfPrevMonth,
  getMonthStringWithoutYear,
} from '@/utils/common';
import React, { useMemo } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { useDate } from '@/store/hooks/useDate';
import { CalendarListBase } from '@/screens/calendar/CalendarListBase';
import { useTheme } from 'tamagui';
import { Container } from '@/components/layouts/containers/Container';

export default function CalendarScreen() {
  const theme = useTheme();
  const {
    selectedMonth,
    selectedYear,
    selectedDate,
    currentMonth,
    onSelectedDateChange,
    onSelectedMonthChange,
  } = useDate('calendar');
  const { journals, getDateCountsForMonth } = useJournal('calendar');
  const pastScrollRange = getCountOfPrevMonth(selectedDate);
  const futureScrollRange = getCountOfNextMonth(selectedDate);

  const dateCounts = useMemo(() => {
    return getDateCountsForMonth(
      selectedYear,
      selectedMonth ? getMonthStringWithoutYear(selectedMonth) : currentMonth,
    );
  }, [
    journals,
    selectedMonth,
    selectedYear,
    currentMonth,
    getDateCountsForMonth,
  ]);

  return (
    <Container p={0}>
      <CalendarListBase
        dateCounts={dateCounts}
        onSelectedDateChange={onSelectedDateChange}
        onSelectedMonthChange={onSelectedMonthChange}
        selectedDate={selectedDate}
        pastScrollRange={pastScrollRange}
        futureScrollRange={futureScrollRange}
        theme={{
          calendarBackground: theme.background.val,
          monthTextColor: theme.gray11.val,
          textMonthFontWeight: '800',
        }}
      />
    </Container>
  );
}
