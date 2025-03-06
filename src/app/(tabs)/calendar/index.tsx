import { Container } from '@/components/layouts/containers/Container';
import { H1, ScrollView, XStack, YStack } from 'tamagui';
import { FALL_STYLE, FALL_STYLE_KEY } from '@/constants/styles';
import {
  getMonthNumber,
  getMonthString,
  getMonthStringWithoutYear,
} from '@/utils/common';
import { VerticalCalendar } from '@/screens/calendar/VerticalCalendar';
import React, { useMemo } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { useTranslation } from 'react-i18next';
import { useDate } from '@/store/hooks/useDate';

export default function CalendarScreen() {
  const {
    selectedMonth,
    selectedYear,
    selectedDate,
    onSelectedDateChange,
    onSelectedMonthChange,
  } = useDate('calendar');
  const { journals, getDateCountsForMonth } = useJournal('calendar');
  const { t } = useTranslation();

  const dateCounts = useMemo(
    () =>
      getDateCountsForMonth(
        selectedYear,
        getMonthStringWithoutYear(selectedMonth),
      ),
    [journals, selectedMonth],
  );

  return (
    <ScrollView>
      <Container edges={['top']} padded>
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
          <VerticalCalendar
            onSelectedMonthChange={onSelectedMonthChange}
            onSelectedDateChange={onSelectedDateChange}
            dateCounts={dateCounts}
            selectedDate={selectedDate}
          />
        </YStack>
      </Container>
    </ScrollView>
  );
}
