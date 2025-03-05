import { Button, H1, XStack, YStack } from 'tamagui';
import React, { useMemo, useState } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { ISODateString } from '@/types/dtos/date';
import { HorizontalCalendar } from '@/components/HorizontalCalendar';
import { CalendarDays, CalendarRange } from '@tamagui/lucide-icons';
import { FALL_STYLE, FALL_STYLE_KEY } from '@/constants/styles';
import { VerticalCalendar } from '@/components/VerticalCalendar';
import { useTranslation } from 'react-i18next';
import {
  getISODateString,
  getLastDate,
  getMonthNumber,
  getMonthString,
  getMonthStringWithoutYear,
} from '@/utils/common';
import { useDate } from '@/store/hooks/useDate';

export const WeekDayPicker = () => {
  const [calendarVariation, setCalendarVariation] = useState<
    'horizontal' | 'vertical'
  >('horizontal');
  const {
    selectedMonth,
    selectedYear,
    currentDate,
    selectedDate,
    onSelectedDateChange,
    onSelectedMonthChange,
  } = useDate();
  const { journals, getDateCountsForMonth } = useJournal();
  const { t } = useTranslation();

  const dateCounts = useMemo(
    () =>
      getDateCountsForMonth(
        selectedYear,
        getMonthStringWithoutYear(selectedMonth),
      ),
    [journals, selectedMonth],
  );

  const dates: ISODateString[] = useMemo(() => {
    const lastDate = getLastDate(
      selectedYear,
      getMonthStringWithoutYear(selectedMonth),
    );

    return Array.from({ length: lastDate }, (_, i) => {
      return getISODateString(
        selectedYear,
        getMonthNumber(getMonthStringWithoutYear(selectedMonth)),
        i + 1,
      );
    });
  }, [selectedYear, selectedMonth]);

  return (
    <YStack
      animation="medium"
      animateOnly={FALL_STYLE_KEY}
      gap="$2"
      mb="$4"
      p="$4"
      bg="$gray12"
      rounded="$8"
      enterStyle={FALL_STYLE}
    >
      <XStack justify="space-between">
        <H1 fontWeight="800" color="$gray1">
          {t(
            `calendar.months.${getMonthString(
              getMonthNumber(getMonthStringWithoutYear(selectedMonth)),
            )}`,
          )}
          .
        </H1>
        <Button
          variant="outlined"
          themeInverse
          icon={
            calendarVariation === 'vertical' ? (
              <CalendarRange size="$1" />
            ) : (
              <CalendarDays size="$1" />
            )
          }
          onPress={() =>
            setCalendarVariation(prev =>
              prev === 'horizontal' ? 'vertical' : 'horizontal',
            )
          }
        />
      </XStack>
      {calendarVariation === 'horizontal' && (
        <HorizontalCalendar
          dates={dates}
          dateCounts={dateCounts}
          selectedDate={selectedDate}
          currentDate={currentDate}
          onSelectedDateChange={onSelectedDateChange}
        />
      )}
      {calendarVariation === 'vertical' && (
        <VerticalCalendar
          onSelectedMonthChange={onSelectedMonthChange}
          onSelectedDateChange={onSelectedDateChange}
          dateCounts={dateCounts}
          selectedDate={selectedDate}
        />
      )}
    </YStack>
  );
};
