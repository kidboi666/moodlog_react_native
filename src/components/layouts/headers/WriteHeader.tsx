import { Button, XStack } from 'tamagui';
import React, { useEffect, useMemo } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { ArrowLeft, CalendarDays } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
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
          p="$2"
          unstyled
          rounded="$2"
          animation="quick"
          animateOnly={PRESS_STYLE_KEY}
          icon={<ArrowLeft size="$1" />}
          onPress={() => router.back()}
          pressStyle={PRESS_STYLE}
        />

        <Button
          unstyled
          animation="quick"
          p="$2"
          color="$gray12"
          icon={<CalendarDays size="$1" />}
          onPress={openCalendar}
          pressStyle={PRESS_STYLE}
        />
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
