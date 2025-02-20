import { Button, XStack } from 'tamagui';
import React, { useEffect, useMemo } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import {
  ALargeSmall,
  CalendarDays,
  ChevronLeft,
  Grid2x2Plus,
} from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { PRESS_STYLE } from '@/constants/styles';
import { useApp } from '@/store/hooks/useApp';
import { HeaderContainer } from '@/components/containers/HeaderContainer';
import { BottomModal } from '@/components/modals/BottomModal';
import { DatePickerModal } from '@/components/modals/contents/CalendarPickerModal';
import { CalendarUtils } from 'react-native-calendars';
import { EmotionPickerModal } from '@/components/modals/contents/EmotionPickerModal';
import { useBottomModal } from '@/hooks/useBottomModal';

export const WriteHeader = () => {
  const router = useRouter();
  const {
    updateDraftEmotion,
    getDateCountsForMonth,
    journals,
    draft,
    updateDraftLocalDate,
  } = useJournal();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const { modalRef: calendarRef, openModal: openCalendar } = useBottomModal();
  const { modalRef: emotionRef, openModal: openEmotion } = useBottomModal();

  const { onChangeFontSize } = useApp();

  const dateCounts = useMemo(
    () => getDateCountsForMonth(currentYear, currentMonth + 1),
    [journals],
  );

  useEffect(() => {
    if (!draft.localDate) {
      updateDraftLocalDate(CalendarUtils.getCalendarDateString(new Date()));
    }
  }, []);

  return (
    <>
      <HeaderContainer>
        <XStack justify="space-between">
          <Button
            unstyled
            animation="quick"
            p="$2"
            color="$gray12"
            icon={<ChevronLeft size="$1" />}
            onPress={() => router.back()}
            pressStyle={PRESS_STYLE}
          />
          <XStack>
            <Button
              unstyled
              animation="quick"
              flexDirection="row"
              gap="$1"
              borderWidth={0}
              p="$2"
              color="$gray12"
              items="center"
              icon={<Grid2x2Plus size="$1" />}
              pressStyle={PRESS_STYLE}
              fontSize="$5"
              onPress={openEmotion}
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
            <Button
              unstyled
              animation="quick"
              p="$2"
              color="$gray12"
              icon={<ALargeSmall size="$1" />}
              pressStyle={PRESS_STYLE}
              onPress={onChangeFontSize}
            />
          </XStack>
        </XStack>
      </HeaderContainer>
      <BottomModal ref={calendarRef}>
        <DatePickerModal
          localDate={draft?.localDate}
          dateCounts={dateCounts}
          onChangeLocalDate={updateDraftLocalDate}
        />
      </BottomModal>
      <BottomModal ref={emotionRef}>
        <EmotionPickerModal
          selectedEmotion={draft?.emotion}
          onChangeEmotion={updateDraftEmotion}
        />
      </BottomModal>
    </>
  );
};
