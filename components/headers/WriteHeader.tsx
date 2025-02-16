import { Button, XStack } from 'tamagui';
import { EmotionPicker } from '../EmotionPicker';
import React from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { HeaderContainer } from '../HeaderContainer';
import { ALargeSmall, X } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { CalendarPicker } from '@/components/CalendarPicker';
import { PressStyle } from '@/constants/styles';
import { useAppContext } from '@/store/hooks/useAppContext';

export const WriteHeader = () => {
  const router = useRouter();
  const { updateDraftEmotion, draft } = useJournalContext();
  const { onChangeFontSize } = useAppContext();

  return (
    <HeaderContainer>
      <XStack justify="space-between">
        <Button
          unstyled
          animation="quick"
          p="$2"
          color="$gray11"
          icon={<X size="$1" />}
          onPress={() => router.back()}
          pressStyle={PressStyle}
        />

        <EmotionPicker
          selectedEmotion={draft?.emotion}
          onChangeEmotion={updateDraftEmotion}
          self="center"
        />
        <XStack>
          <CalendarPicker />
          <Button
            unstyled
            animation="quick"
            p="$2"
            color="$gray11"
            icon={<ALargeSmall size="$1" />}
            pressStyle={PressStyle}
            onPress={onChangeFontSize}
          />
        </XStack>
      </XStack>
    </HeaderContainer>
  );
};
