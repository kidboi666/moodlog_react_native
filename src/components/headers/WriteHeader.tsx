import { Button, XStack } from 'tamagui';
import { EmotionPicker } from '../EmotionPicker';
import React from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { HeaderContainer } from '../HeaderContainer';
import { ALargeSmall, ChevronLeft } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { CalendarPicker } from '@/components/CalendarPicker';
import { PRESS_STYLE } from '@/constants/styles';
import { useAppContext } from '@/store/hooks/useAppContext';

export const WriteHeader = () => {
  const router = useRouter();
  const { updateDraftEmotion, draft, updateDraftLocalDate } =
    useJournalContext();
  const { onChangeFontSize } = useAppContext();

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

        <EmotionPicker
          selectedEmotion={draft?.emotion}
          onChangeEmotion={updateDraftEmotion}
          self="center"
        />
        <XStack>
          <CalendarPicker
            localDate={draft?.localDate}
            onChangeLocalDate={updateDraftLocalDate}
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
  );
};
