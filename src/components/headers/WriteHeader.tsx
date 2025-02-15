import { Button, XStack } from 'tamagui';
import { EmotionPicker } from '@/components/EmotionPicker';
import React from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { HeaderContainer } from '@/components/HeaderContainer';
import { X } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

export const WriteHeader = () => {
  const { updateDraftEmotion, draft } = useJournalContext();
  const router = useRouter();
  return (
    <HeaderContainer>
      <XStack justify="center">
        <Button
          unstyled
          size="$3"
          animation="quick"
          p="$2"
          position="absolute"
          l={0}
          color="$gray11"
          icon={<X size="$1" />}
          onPress={() => router.back()}
          pressStyle={{
            scale: 0.9,
            opacity: 0.5,
          }}
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
