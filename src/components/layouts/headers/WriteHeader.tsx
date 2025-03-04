import { Button, XStack } from 'tamagui';
import React, { useEffect, useMemo } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { BottomModal } from '@/components/modals/BottomModal';
import { DatePickerModal } from '@/components/modals/contents/CalendarPickerModal';
import { CalendarUtils } from 'react-native-calendars';
import { useBottomModal } from '@/hooks/useBottomModal';
import { useDraft } from '@/store/hooks/useDraft';
import { useDate } from '@/store/hooks/useDate';

export const WriteHeader = () => {
  const router = useRouter();
  const { getDateCountsForMonth, journals } = useJournal();
  const { draft, onLocalDateChange } = useDraft();
  const { selectedMonth, selectedYear, onSelectedMonthChange } = useDate();
  const { modalRef: calendarRef, openModal: openCalendar } = useBottomModal();

  const dateCounts = useMemo(
    () => getDateCountsForMonth(selectedYear, selectedMonth + 1),
    [journals],
  );

  useEffect(() => {
    if (!draft.localDate) {
      onLocalDateChange(CalendarUtils.getCalendarDateString(new Date()));
    }
  }, []);

  return (
    <>
      <XStack justify="space-between">
        <Button
          rounded="$2"
          size="$3"
          animation="quick"
          icon={<ArrowLeft size="$1" />}
          onPress={() => router.back()}
        />

        {/*<Button*/}
        {/*  animation="quick"*/}
        {/*  size="$3"*/}
        {/*  icon={<CalendarDays size="$1" />}*/}
        {/*  onPress={openCalendar}*/}
        {/*/>*/}
      </XStack>

      {/* BottomModal */}
      <BottomModal ref={calendarRef}>
        <DatePickerModal
          localDate={draft?.localDate}
          dateCounts={dateCounts}
          onLocalDateChange={onLocalDateChange}
          onSelectedMonthChange={onSelectedMonthChange}
        />
      </BottomModal>
    </>
  );
};
