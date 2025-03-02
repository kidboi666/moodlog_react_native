import { useTranslation } from 'react-i18next';
import { AnimatePresence, Button, View, XStack, YStack } from 'tamagui';
import {
  PARAGRAPH_DELAY,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/constants/styles';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { emotionTheme } from '@/constants/themes';
import React, { useEffect, useState } from 'react';
import { useDraft } from '@/store/hooks/useDraft';
import { Container } from '@/components/layouts/containers/Container';
import { router } from 'expo-router';
import { MoodSelectTitle } from '@/components/features/write/MoodSelectTitle';
import { SelectedMoodContainer } from '@/components/features/write/SelectedMoodContainer';
import { PickerMood } from '@/components/features/write/PickerMood';
import { NextButton } from '@/components/features/write/NextButton';
import { FadeIn } from '@/components/FadeIn';

export default function MoodScreen() {
  const { t } = useTranslation();
  const { draft, onEmotionChange, initDraft } = useDraft();
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
          <FadeIn>
            <MoodSelectTitle />
          </FadeIn>

          <View flex={1} items="center" justify="center">
            <AnimatePresence>
              {draft.emotion && (
                <FadeIn delay={PARAGRAPH_DELAY.THIRD}>
                  <SelectedMoodContainer
                    key={animationKey}
                    emotion={draft.emotion}
                  />
                </FadeIn>
              )}
            </AnimatePresence>
          </View>

          <AnimatePresence>
            <PickerMood
              emotion={draft?.emotion}
              onEmotionChange={onEmotionChange}
            />
          </AnimatePresence>

          <AnimatePresence>
            <NextButton emotion={draft?.emotion} />
          </AnimatePresence>
        </YStack>

        <AnimatePresence>
          {draft.emotion ? (
            <View
              animation="medium"
              enterStyle={{
                opacity: 0,
              }}
              exitStyle={{
                opacity: 0,
              }}
              width="3%"
              height="100%"
              borderTopLeftRadius="$4"
              borderBottomLeftRadius="$4"
              bg={emotionTheme[draft.emotion?.type][draft.emotion?.level]}
            />
          ) : (
            <View
              animation="medium"
              enterStyle={{
                opacity: 0,
              }}
              exitStyle={{
                opacity: 0,
              }}
              width="3%"
              height="100%"
              borderBottomLeftRadius="$4"
              borderTopLeftRadius="$4"
              bg="$gray8"
            />
          )}
        </AnimatePresence>
      </XStack>
    </Container>
  );
}
