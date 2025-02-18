import { Button, H1, XStack, YStack } from 'tamagui';
import { MONTHS, WEEK_DAY } from '@/constants/date';
import React, { useCallback, useMemo, useState } from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { SelectedDate } from '@/types/dtos/date';
import { HorizontalCalendar } from '@/components/HorizontalCalendar';
import { CalendarDays, CalendarRange } from '@tamagui/lucide-icons';
import { PressStyle } from '@/constants/styles';
import { CalendarUtils } from 'react-native-calendars';
import { useThemeContext } from '@/store/hooks/useThemeContext';
import { VerticalCalendar } from '@/components/VerticalCalendar';

export const WeekDayPicker = () => {
  const [variation, setVariation] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  );
  const { currentTheme } = useThemeContext();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    date: currentDate.getDate(),
    day: Object.values(WEEK_DAY)[currentDay],
  });
  const { updateSelectedJournals, journals, getDateCountsForMonth } =
    useJournalContext();

  const dateCounts = useMemo(
    () => getDateCountsForMonth(currentYear, currentMonth + 1),
    [],
  );

  const dates = useMemo(() => {
    const lastDate = new Date(currentYear, currentMonth, 0).getDate();

    return Array.from({ length: lastDate }, (_, i) => {
      const date = new Date(currentYear, currentMonth, i + 1);
      return {
        date: i + 1,
        day: Object.values(WEEK_DAY)[date.getDay()],
      };
    });
  }, [currentYear, currentMonth]);

  const handleSelectedDate = useCallback(
    (date: SelectedDate) => {
      setSelectedDate(date);

      const timeStamp = new Date(
        currentYear,
        currentMonth,
        date.date + 1,
      ).getTime();
      updateSelectedJournals(CalendarUtils.getCalendarDateString(timeStamp));
    },
    [currentYear, currentMonth, updateSelectedJournals],
  );

  return (
    <YStack
      animation="medium"
      gap="$2"
      mb="$4"
      p="$4"
      bg="$gray12"
      rounded="$8"
      enterStyle={{
        y: -300,
      }}
    >
      <XStack justify="space-between">
        <H1 fontWeight="800" color="$gray1">
          {Object.values(MONTHS)[currentMonth]}.
        </H1>
        <Button
          unstyled
          color="$gray1"
          icon={
            variation === 'vertical' ? (
              <CalendarRange size="$1" />
            ) : (
              <CalendarDays size="$1" />
            )
          }
          pressStyle={PressStyle}
          onPress={() =>
            setVariation(prev =>
              prev === 'horizontal' ? 'vertical' : 'horizontal',
            )
          }
        />
      </XStack>
      {variation === 'horizontal' && (
        <HorizontalCalendar
          key={currentTheme}
          dates={dates}
          dateCounts={dateCounts}
          selectedDate={selectedDate}
          currentDate={currentDate}
          onChangeSelectedDate={handleSelectedDate}
        />
      )}
      {variation === 'vertical' && (
        <VerticalCalendar
          onSelectedDate={handleSelectedDate}
          selectedDate={selectedDate}
          currentYear={currentYear}
          currentMonth={currentMonth}
        />
      )}
    </YStack>
  );
};
