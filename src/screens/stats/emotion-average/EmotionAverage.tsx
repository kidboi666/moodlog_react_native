import { AnimatePresence, useEvent, YStack } from 'tamagui';
import { SignatureEmotion } from '@/types/entries';
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
import { EmotionLevel } from '@/types/enums';
import { CollapsedContent } from '@/screens/stats/emotion-average/CollapsedContent';
import { ExpandedContent } from '@/screens/stats/emotion-average/ExpandedContent';
import { getEmotionTheme } from '@/utils/common';

interface Props {
  signatureEmotion: Nullable<SignatureEmotion>;
}

const AnimatedCard = Animated.createAnimatedComponent(YStack);

export const EmotionAverage = ({ signatureEmotion }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isTouched = useSharedValue(false);

  const onPress = useEvent(() => {
    setIsExpanded(prev => !prev);
  });

  const hasSignatureEmotion = signatureEmotion
    ? signatureEmotion?.count > 0
    : false;

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
        isExpanded
          ? '$gray5'
          : hasSignatureEmotion
            ? getEmotionTheme(signatureEmotion!.type, EmotionLevel.FULL)
            : '$gray5'
      }
      rounded="$8"
      onPress={onPress}
      onPressIn={() => (isTouched.value = true)}
      onPressOut={() => (isTouched.value = false)}
      style={animatedStyle}
    >
      <AnimatePresence>
        {isExpanded ? (
          <ExpandedContent />
        ) : (
          <CollapsedContent
            hasSignatureEmotion={hasSignatureEmotion}
            signatureEmotion={signatureEmotion}
          />
        )}
      </AnimatePresence>
    </AnimatedCard>
  );
};
