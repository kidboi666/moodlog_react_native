import {
  getCountOfNextMonth,
  getCountOfPrevMonth,
  getMonthStringWithoutYear,
} from '@/utils/common';
import React, { Fragment, useMemo } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { useDate } from '@/store/hooks/useDate';
import { CalendarListBase } from '@/screens/calendar/CalendarListBase';
import { ScrollView, useTheme, YStack } from 'tamagui';
import { Container } from '@/components/layouts/containers/Container';
import { JournalCard } from '@/components/JournalCard';
import * as S from '@/styles/Main.styled';
import { FadeIn } from '@/components/FadeIn';
import { EmptyJournal } from '@/components/EmptyJournal';

export default function EntriesScreen() {
  const theme = useTheme();
  const {
    selectedMonth,
    selectedYear,
    selectedDate,
    currentMonth,
    onSelectedDateChange,
    onSelectedMonthChange,
  } = useDate('entries');
  const { dailyJournals, journals, getDateCountsForMonth } =
    useJournal('entries');
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
    <ScrollView>
      <Container edges={['top']} gap="$4" padded>
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
        <YStack>
          {Array.isArray(dailyJournals) ? (
            dailyJournals.map((journal, index) => (
              <Fragment key={journal.id}>
                {index > 0 && <S.Separator />}
                <FadeIn delay={100 * (index + 1)}>
                  <JournalCard journal={journal} />
                </FadeIn>
              </Fragment>
            ))
          ) : (
            <EmptyJournal date={dailyJournals} />
          )}
        </YStack>
      </Container>
    </ScrollView>
  );
}
