import { Button, H1, XStack, YStack } from 'tamagui';
import React, { useCallback, useMemo, useState } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { ISODateString } from '@/types/dtos/date';
import { HorizontalCalendar } from '@/components/HorizontalCalendar';
import { CalendarDays, CalendarRange } from '@tamagui/lucide-icons';
import { FALL_STYLE, FALL_STYLE_KEY, PRESS_STYLE } from '@/constants/styles';
import { VerticalCalendar } from '@/components/VerticalCalendar';
import { CalendarUtils } from 'react-native-calendars';
import { useTranslation } from 'react-i18next';
import { getMonthString } from '@/utils/common';

export const WeekDayPicker = () => {
  const [variation, setVariation] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  );
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const [selectedDate, setSelectedDate] = useState<ISODateString>(
    CalendarUtils.getCalendarDateString(currentDate),
  );
  const { getJournalsByDate, journals, getDateCountsForMonth } = useJournal();
  const { t } = useTranslation();

  const dateCounts = useMemo(
    () => getDateCountsForMonth(currentYear, currentMonth + 1),
    [journals],
  );

  const dates: ISODateString[] = useMemo(() => {
    const lastDate = new Date(currentYear, currentMonth, 0).getDate();

    return Array.from({ length: lastDate }, (_, i) => {
      return `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${(i + 1).toString().padStart(2, '0')}` as ISODateString;
    });
  }, [currentYear, currentMonth]);

  const handleSelectedDate = useCallback(
    (date: ISODateString) => {
      setSelectedDate(date);
      getJournalsByDate(date);
    },
    [currentYear, currentMonth, getJournalsByDate],
  );

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
            variation === 'vertical' ? (
              <CalendarRange size="$1" />
            ) : (
              <CalendarDays size="$1" />
            )
          }
          pressStyle={PRESS_STYLE}
          onPress={() =>
            setVariation(prev =>
              prev === 'horizontal' ? 'vertical' : 'horizontal',
            )
          }
        />
      </XStack>
      {variation === 'horizontal' && (
        <HorizontalCalendar
          dates={dates}
          dateCounts={dateCounts}
          selectedDate={selectedDate}
          currentDate={currentDate}
          onChangeSelectedDate={handleSelectedDate}
        />
      )}
      {variation === 'vertical' && (
        <VerticalCalendar
          onChangeSelectedDate={handleSelectedDate}
          dateCounts={dateCounts}
          selectedDate={selectedDate}
          currentYear={currentYear}
          currentMonth={currentMonth}
        />
      )}
    </YStack>
  );
};
