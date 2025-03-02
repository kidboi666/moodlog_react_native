import { AnimatePresence, Button, View, XStack, YStack } from 'tamagui';
import { CARD_DELAY, PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import { ArrowLeft } from '@tamagui/lucide-icons';
import React, { useEffect, useState } from 'react';
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
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(key => key + 1);
  }, [draft.emotion?.type, draft.emotion?.level]);

  return (
    <Container edges={['top', 'bottom']} pr={0}>
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
      <XStack flex={1} gap="$3">
        <YStack flex={1} justify="space-between" p="$2" gap="$6">
          <FadeIn delay={CARD_DELAY.FIRST}>
            <MoodSelectTitle />
          </FadeIn>

          <FadeIn delay={CARD_DELAY.SECOND} flex={1}>
            <View flex={1} items="center" justify="center">
              <AnimatePresence>
                <SelectedMoodContainer
                  key={animationKey}
                  emotion={draft.emotion ?? null}
                />
              </AnimatePresence>
            </View>
          </FadeIn>

          <FadeIn delay={CARD_DELAY.THIRD}>
            <AnimatePresence>
              <PickerMood
                emotion={draft?.emotion}
                onEmotionChange={onEmotionChange}
              />
            </AnimatePresence>
          </FadeIn>

          <FadeIn delay={CARD_DELAY.FOURTH} items="center">
            <NextButton emotion={draft?.emotion} />
          </FadeIn>
        </YStack>
        <AnimatePresence>
          <MoodBar emotion={draft?.emotion} />
        </AnimatePresence>
      </XStack>
    </Container>
  );
}
