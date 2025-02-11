import { ChevronLeft } from '@tamagui/lucide-icons';
import { Button, XStack } from 'tamagui';
import { EmotionPicker } from '@/components/emotion/EmotionPicker';
import React from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { HeaderContainer } from '@/components/shared/HeaderContainer';
import { useRouter } from 'expo-router';

export const WriteHeader = () => {
  const { updateDraftEmotion, draft } = useJournalContext();
  const router = useRouter();
  return (
    <HeaderContainer>
      <XStack width="100%">
        <Button
          size="$4"
          justify="center"
          icon={ChevronLeft}
          onPress={() => router.back()}
        />
        <XStack flex={1} items="center" gap="$2" justify="center">
          <EmotionPicker
            selectedEmotion={draft?.emotion}
            onChangeEmotion={updateDraftEmotion}
            justify="center"
          />
        </XStack>
        <ThemeToggle self="flex-end" />
      </XStack>
    </HeaderContainer>
  );
};
