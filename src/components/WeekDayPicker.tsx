import { Button, H1, XStack, YStack } from 'tamagui';
import React, { useMemo, useState } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { ISODateString } from '@/types/dtos/date';
import { HorizontalCalendar } from '@/components/HorizontalCalendar';
import { CalendarDays, CalendarRange } from '@tamagui/lucide-icons';
import { FALL_STYLE, FALL_STYLE_KEY, PRESS_STYLE } from '@/constants/styles';
import { VerticalCalendar } from '@/components/VerticalCalendar';
import { useTranslation } from 'react-i18next';
import { getISODateString, getLastDate, getMonthString } from '@/utils/common';
import { useDate } from '@/store/hooks/useDate';

export const WeekDayPicker = () => {
  const [calendarVariation, setCalendarVariation] = useState<
    'horizontal' | 'vertical'
  >('horizontal');
  const {
    currentYear,
    currentMonth,
    currentDate,
    selectedDate,
    onSelectedDateChange,
  } = useDate();
  const { getJournalsByDate, journals, getDateCountsForMonth } = useJournal();
  const { t } = useTranslation();

  const dateCounts = useMemo(
    () => getDateCountsForMonth(currentYear, currentMonth + 1),
    [journals],
  );

  const dates: ISODateString[] = useMemo(() => {
    const lastDate = getLastDate(currentYear, currentMonth);

    return Array.from({ length: lastDate }, (_, i) => {
      return getISODateString(currentYear, currentMonth, i + 1);
    });
  }, [currentYear, currentMonth]);

  const handleSelectedDate = (date: ISODateString) => {
    onSelectedDateChange(date);
  };

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
          {t(`calendar.months.${getMonthString(currentMonth)}`)}.
        </H1>
        <Button
          unstyled
          color="$gray1"
          icon={
            calendarVariation === 'vertical' ? (
              <CalendarRange size="$1" />
            ) : (
              <CalendarDays size="$1" />
            )
          }
          pressStyle={PRESS_STYLE}
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
          onSelectedDateChange={onSelectedDateChange}
          dateCounts={dateCounts}
          selectedDate={selectedDate}
        />
      )}
    </YStack>
  );
};
