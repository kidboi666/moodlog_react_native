import { Button, XStack, YStack } from 'tamagui';
import { CARD_DELAY, PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import { ArrowLeft } from '@tamagui/lucide-icons';
import React from 'react';
import { useDraft } from '@/store/hooks/useDraft';
import { Container } from '@/components/layouts/containers/Container';
import { router } from 'expo-router';
import { MoodSelectTitle } from '@/components/features/write/MoodSelectTitle';
import { SelectedMoodContainer } from '@/components/features/write/SelectedMoodContainer';
import { PickerMood } from '@/components/features/write/PickerMood';
import { NextButton } from '@/components/features/write/NextButton';
import { FadeIn } from '@/components/FadeIn';
import { MoodBar } from '@/components/features/write/MoodBar';

export default function MoodScreen() {
  const { draft, onEmotionChange } = useDraft();

  return (
    <Container edges={['top']} pr={0}>
      <XStack flex={1} gap="$3">
        <YStack flex={1}>
          <XStack>
            <Button
              p="$2"
              unstyled
              rounded="$2"
              animateOnly={PRESS_STYLE_KEY}
              icon={<ArrowLeft size="$1" />}
              onPress={() => router.back()}
              pressStyle={PRESS_STYLE}
              animation="bouncy"
            />
          </XStack>
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
