import { Button, H2, H3, Text, useEvent, XStack, YStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { SignatureEmotion } from '@/types/entries';
import { Maximize2, Minimize2 } from '@tamagui/lucide-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useState } from 'react';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/constants/size';
import { Nullable } from '@/types/utils';
import { getEmotionTheme } from '@/utils/common';
import { EmotionLevel, EmotionType } from '@/types/enums';

interface Props {
  signatureEmotion: Nullable<SignatureEmotion>;
}

const AnimatedCard = Animated.createAnimatedComponent(YStack);

export const EmotionAverage = ({ signatureEmotion }: Props) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const isTouched = useSharedValue(false);

  const onPress = useEvent(() => {
    setIsExpanded(prev => !prev);
  });

  const hasSignatureEmotion =
    signatureEmotion?.count && signatureEmotion.count > 0;

  const animatedStyle = useAnimatedStyle(() => ({
    height: withSpring(
      isExpanded ? RECORD_CARD_EXPANDED_HEIGHT : RECORD_CARD_HEIGHT,
    ),
    transform: [{ scale: withSpring(isTouched.value ? 0.9 : 1) }],
    opacity: withTiming(isTouched.value ? 0.6 : 1),
  }));

  return (
    <AnimatedCard
      flex={1}
      p="$4"
      justify="space-between"
      bg={
        hasSignatureEmotion
          ? getEmotionTheme(
              signatureEmotion.type as EmotionType,
              EmotionLevel.FULL,
            )
          : '$gray5'
      }
      rounded="$8"
      onPress={onPress}
      onPressIn={() => (isTouched.value = true)}
      onPressOut={() => (isTouched.value = false)}
      style={animatedStyle}
    >
      <YStack gap="$2">
        <H3 color={hasSignatureEmotion ? '$gray1' : '$gray12'}>
          {t('records.stats.emotion.title')}
        </H3>
        <Text color={hasSignatureEmotion ? '$gray1' : '$gray12'}>
          {t('records.stats.emotion.description')}
        </Text>
      </YStack>
      <YStack>
        <XStack>
          <H2 color={hasSignatureEmotion ? '$gray1' : '$gray12'} flex={1}>
            {hasSignatureEmotion
              ? t(`emotions.types.${signatureEmotion.type}`)
              : t('common.fallback.text')}
          </H2>
          <Button
            unstyled
            self="flex-end"
            bg="transparent"
            color="$gray1"
            opacity={0.2}
            icon={
              isExpanded ? <Minimize2 size="$1" /> : <Maximize2 size="$1" />
            }
          />
        </XStack>
      </YStack>
    </AnimatedCard>
  );
};
