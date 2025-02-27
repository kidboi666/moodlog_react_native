import { AnimatePresence, Button, XStack } from 'tamagui';
import React, { useEffect, useMemo } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import {
  CalendarDays,
  Check,
  ChevronLeft,
  Grid2x2Plus,
} from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { ENTER_STYLE, PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import { HeaderContainer } from '@/components/layouts/containers/HeaderContainer';
import { BottomModal } from '@/components/modals/BottomModal';
import { DatePickerModal } from '@/components/modals/contents/CalendarPickerModal';
import { CalendarUtils } from 'react-native-calendars';
import { EmotionPickerModal } from '@/components/modals/contents/EmotionPickerModal';
import { useBottomModal } from '@/hooks/useBottomModal';
import { useToastController } from '@tamagui/toast';
import { useTranslation } from 'react-i18next';

export const WriteHeader = () => {
  const router = useRouter();
  const {
    updateDraftEmotion,
    getDateCountsForMonth,
    journals,
    draft,
    addJournal,
    updateDraftLocalDate,
  } = useJournal();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const { modalRef: calendarRef, openModal: openCalendar } = useBottomModal();
  const { modalRef: emotionRef, openModal: openEmotion } = useBottomModal();
  const toast = useToastController();
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (!draft.emotion?.type) {
      toast.show(t('notifications.warning.emotion.title'), {
        message: t('notifications.warning.emotion.message'),
        duration: 2000,
      });
    }

    addJournal(draft);
  };

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
        </XStack>
      </XStack>
      <AnimatePresence>
        {draft.content && draft.title && (
          <Button
            unstyled
            bg="$background"
            themeInverse
            px="$4"
            justify="center"
            icon={Check}
            rounded="$4"
            color="$color"
            disabled={!draft?.content}
            animation="quick"
            animateOnly={PRESS_STYLE_KEY}
            pressStyle={PRESS_STYLE}
            enterStyle={ENTER_STYLE}
            exitStyle={ENTER_STYLE}
            onPress={handleSubmit}
          />
        )}
      </AnimatePresence>

      {/* BottomModal */}
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
    </HeaderContainer>
  );
};
