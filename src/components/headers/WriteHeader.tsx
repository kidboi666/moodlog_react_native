import { Button, XStack } from 'tamagui';
import { EmotionPicker } from '../EmotionPicker';
import React from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { ALargeSmall, ChevronLeft } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { CalendarPicker } from '@/components/CalendarPicker';
import { PRESS_STYLE } from '@/constants/styles';
import { useApp } from '@/store/hooks/useApp';
import { HeaderContainer } from '@/components/containers/HeaderContainer';

export const WriteHeader = () => {
  const router = useRouter();
  const { updateDraftEmotion, draft, updateDraftLocalDate } = useJournal();
  const { onChangeFontSize } = useApp();

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
          <EmotionPicker
            selectedEmotion={draft?.emotion}
            onChangeEmotion={updateDraftEmotion}
            self="center"
          />
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
