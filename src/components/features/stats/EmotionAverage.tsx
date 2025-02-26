import { Button, H1, H3, Text, useEvent, XStack, YStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { SignatureEmotion } from '@/types/entries';
import { Maximize2, Minimize2 } from '@tamagui/lucide-icons';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useState } from 'react';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/constants/size';
import { Nullable } from '@/types/utils';
import { getEmotionTheme } from '@/utils/common';
import { EmotionLevel } from '@/types/enums';

interface Props {
  signatureEmotion: Nullable<SignatureEmotion>;
}

const AnimatedCard = Animated.createAnimatedComponent(YStack);

export const EmotionAverage = ({ signatureEmotion }: Props) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const onPress = useEvent(() => {
    setIsExpanded(prev => !prev);
  });
  const hasSignatureEmotion =
    signatureEmotion?.count && signatureEmotion.count > 0;

  const animatedStyle = useAnimatedStyle(() => ({
    height: withSpring(
      isExpanded ? RECORD_CARD_EXPANDED_HEIGHT : RECORD_CARD_HEIGHT,
    ),
  }));
  return (
    <AnimatedCard
      flex={1}
      p="$4"
      justify="space-between"
      bg={
        hasSignatureEmotion
          ? getEmotionTheme(signatureEmotion.type, EmotionLevel.FULL)
          : '$gray5'
      }
      rounded="$8"
      onPress={onPress}
      animation="quick"
      animateOnly={PRESS_STYLE_KEY}
      pressStyle={PRESS_STYLE}
      style={animatedStyle}
    >
      <YStack>
        <H3 color={hasSignatureEmotion ? '$gray1' : '$gray12'}>
          {t('records.stats.emotion.title')}
        </H3>
        <Text color={hasSignatureEmotion ? '$gray1' : '$gray12'}>
          {t('records.stats.emotion.description')}
        </Text>
      </YStack>
      <YStack>
        <XStack>
          <H1 color={hasSignatureEmotion ? '$gray1' : '$gray12'} flex={1}>
            {hasSignatureEmotion
              ? t(`emotions.types.${signatureEmotion.type}`)
              : t('common.fallback.text')}
          </H1>
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
