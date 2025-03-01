import { useTranslation } from 'react-i18next';
import {
  AnimatePresence,
  Button,
  H2,
  Square,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui';
import {
  CARD_DELAY,
  ENTER_STYLE,
  ENTER_STYLE_KEY,
  PRESS_STYLE,
} from '@/constants/styles';
import { EmotionLevel, EmotionType } from '@/types/enums';
import { Check } from '@tamagui/lucide-icons';
import { emotionTheme } from '@/constants/themes';
import React, { useEffect, useState } from 'react';
import { useDraft } from '@/store/hooks/useDraft';
import { Container } from '@/components/layouts/containers/Container';
import { router } from 'expo-router';
import { FadeIn } from '@/components/FadeIn';

export default function MoodScreen() {
  const { t } = useTranslation();
  const { draft, onEmotionChange } = useDraft();
  const [animationKey, setAnimationKey] = useState(0);

  const handleNextPageChange = () => {
    router.push('/write/journal_write');
  };

  useEffect(() => {
    setAnimationKey(key => key + 1);
  }, [draft.emotion?.type, draft.emotion?.level]);

  return (
    <Container edges={['bottom']} flexDirection="row" gap="$3" pr={0}>
      <YStack flex={1} justify="space-between" p="$2" gap="$6">
        <FadeIn delay={CARD_DELAY.FIRST}>
          <H2 fontWeight="800">{t('placeholders.emotion')}</H2>
        </FadeIn>
        <View flex={1} items="center" justify="center">
          <AnimatePresence>
            {draft.emotion && (
              <XStack
                key={animationKey}
                gap="$2"
                justify="center"
                animation="bouncy"
                position="absolute"
                animateOnly={ENTER_STYLE_KEY}
                enterStyle={ENTER_STYLE}
                exitStyle={ENTER_STYLE}
              >
                <H2 color="$gray11">
                  {t(`emotions.levels.${draft.emotion?.level}`)}
                </H2>
                <H2>{t(`emotions.types.${draft.emotion?.type}`)}</H2>
              </XStack>
            )}
          </AnimatePresence>
        </View>
        <FadeIn delay={CARD_DELAY.SECOND}>
          <XStack justify="space-between">
            {Object.values(EmotionType).map((type, index) => (
              <YStack key={index} gap="$4" items="center">
                <YStack gap="$4">
                  {Object.values(EmotionLevel).map(level => (
                    <Button
                      key={type + level}
                      unstyled
                      animation="medium"
                      justify="center"
                      items="center"
                      pressStyle={PRESS_STYLE}
                      onPress={() =>
                        onEmotionChange({
                          type,
                          level,
                        })
                      }
                      icon={
                        draft.emotion?.type === type &&
                        draft.emotion?.level === level ? (
                          <Check
                            position="absolute"
                            z="$1"
                            color={
                              level === EmotionLevel.ZERO ? '$gray10' : '$gray4'
                            }
                            size="$1"
                          />
                        ) : null
                      }
                    >
                      <Square
                        rounded="$6"
                        size="$5"
                        bg={emotionTheme[type][level]}
                      />
                    </Button>
                  ))}
                </YStack>
                <View key={index}>
                  <Text fontSize="$4" color="$gray11" fontWeight="400">
                    {t(`emotions.types.${type}`)}
                  </Text>
                </View>
              </YStack>
            ))}
          </XStack>
        </FadeIn>
        <FadeIn delay={CARD_DELAY.THIRD}>
          <Button
            themeInverse={!!draft.emotion}
            disabled={!draft.emotion}
            fontWeight="800"
            color={!draft.emotion ? '$gray10' : '$gray12'}
            onPress={handleNextPageChange}
          >
            {t('common.button.next')}
          </Button>
        </FadeIn>
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
    </Container>
  );
}
