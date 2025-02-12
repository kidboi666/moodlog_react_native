import { Button, XStack } from 'tamagui';
import { EmotionPicker } from '@/components/emotion/EmotionPicker';
import React from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { HeaderContainer } from '@/components/shared/HeaderContainer';
import { X } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

export const WriteHeader = () => {
  const { updateDraftEmotion, draft } = useJournalContext();
  const router = useRouter();
  return (
    <HeaderContainer>
      <XStack justify="center">
        <Button
          size="$3"
          position="absolute"
          l={0}
          icon={X}
          onPress={() => router.back()}
        />

        <EmotionPicker
          selectedEmotion={draft?.emotion}
          onChangeEmotion={updateDraftEmotion}
          self="center"
        />
      </XStack>
    </HeaderContainer>
  );
};
