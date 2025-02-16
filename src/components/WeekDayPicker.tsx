import { H1, XStack, YStack } from 'tamagui';
import { MONTHS, WEEK_DAY } from '@/constants/date';
import { useCallback, useMemo, useState } from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { SelectedDate } from '@/types/dtos/date';
import { transformISODate } from '@/utils/common/date';
import { HorizontalCalendar } from '@/components/HorizontalCalendar';

export const WeekDayPicker = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    date: currentDate.getDate(),
    day: Object.values(WEEK_DAY)[currentDay],
  });
  const { updateSelectedJournals } = useJournalContext();

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
      updateSelectedJournals(transformISODate(timeStamp));
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
      <H1 fontWeight="800" color="$gray1">
        {Object.values(MONTHS)[currentMonth]}.
      </H1>
      <XStack flex={1} justify="center" rounded="$4" items="center">
        <HorizontalCalendar
          dates={dates}
          selectedDate={selectedDate}
          currentDate={currentDate}
          onChangeSelectedDate={handleSelectedDate}
        />
      </XStack>
    </YStack>
  );
};
