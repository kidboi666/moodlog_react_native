import { AnimatePresence, useEvent, YStack } from 'tamagui';
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
import { CollapsedContent } from '@/components/features/stats/expressive-month/CollapsedContent';
import { ExpandedContent } from '@/components/features/stats/expressive-month/ExpandedContent';
import { useStatistics } from '@/store/hooks/useStatistics';

const AnimatedCard = Animated.createAnimatedComponent(YStack);

export const CurrentMonth = () => {
  const { selectedMonthStats } = useStatistics();
  const [isExpanded, setIsExpanded] = useState(false);
  const isTouched = useSharedValue(false);

  const onPress = useEvent(() => {
    setIsExpanded(prev => !prev);
  });

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
      onPressIn={() => (isTouched.value = true)}
      onPressOut={() => (isTouched.value = false)}
      bg="$gray5"
      rounded="$8"
      onPress={onPress}
      style={animatedStyle}
    >
      <AnimatePresence>
        {isExpanded ? (
          <ExpandedContent
            selectedMonthStats={selectedMonthStats}
            isExpanded={isExpanded}
          />
        ) : (
          <CollapsedContent
            selectedMonthStats={selectedMonthStats}
            isExpanded={isExpanded}
          />
        )}
      </AnimatePresence>
    </AnimatedCard>
  );
};
