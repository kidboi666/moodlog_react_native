import { XStack, YStack } from 'tamagui';
import { CARD_DELAY } from '@/constants/styles';
import React from 'react';
import { useDraft } from '@/store/hooks/useDraft';
import { Container } from '@/components/layouts/containers/Container';
import { MoodSelectTitle } from '@/screens/write/MoodSelectTitle';
import { SelectedMoodContainer } from '@/screens/write/SelectedMoodContainer';
import { PickerMood } from '@/screens/write/PickerMood';
import { NextButton } from '@/screens/write/NextButton';
import { FadeIn } from '@/components/FadeIn';
import { MoodBar } from '@/screens/write/MoodBar';
import { WriteHeader } from '@/components/layouts/headers/WriteHeader';

export default function MoodScreen() {
  const { draft, onEmotionChange } = useDraft();

  return (
    <Container edges={['bottom']} pr={0} Header={<WriteHeader />}>
      <XStack flex={1} gap="$3">
        <YStack flex={1} gap="$6">
          <YStack flex={1} justify="space-between" p="$2" gap="$6">
            <FadeIn delay={CARD_DELAY.FIRST}>
              <MoodSelectTitle />
            </FadeIn>

            <FadeIn delay={CARD_DELAY.SECOND} flex={1}>
              <SelectedMoodContainer emotion={draft.emotion ?? null} />
            </FadeIn>

            <FadeIn delay={CARD_DELAY.THIRD}>
              <PickerMood
                emotion={draft?.emotion}
                onEmotionChange={onEmotionChange}
              />
            </FadeIn>

            <NextButton emotion={draft?.emotion} />
          </YStack>
        </YStack>

        <MoodBar emotion={draft?.emotion} />
      </XStack>
    </Container>
  );
}
