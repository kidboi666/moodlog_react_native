import { H1, XStack, YStack } from 'tamagui';
import React, { useMemo } from 'react';
import { ISODateString } from '@/types/dtos/date';
import { HorizontalCalendar } from '@/components/HorizontalCalendar';
import { FALL_STYLE, FALL_STYLE_KEY } from '@/constants/styles';
import { useTranslation } from 'react-i18next';
import {
  getISODateString,
  getLastDate,
  getMonthNumber,
  getMonthString,
  getMonthStringWithoutYear,
} from '@/utils/common';
import { useJournal } from '@/store/hooks/useJournal';
import { useDate } from '@/store/hooks/useDate';

export const WeekDay = () => {
  const {
    selectedMonth,
    selectedYear,
    currentDate,
    selectedDate,
    onSelectedDateChange,
  } = useDate('week');
  const { journals, getDateCountsForMonth } = useJournal('week');
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
      </XStack>
      <HorizontalCalendar
        dates={dates}
        dateCounts={dateCounts}
        selectedDate={selectedDate}
        currentDate={currentDate}
        onSelectedDateChange={onSelectedDateChange}
      />
    </YStack>
  );
};
