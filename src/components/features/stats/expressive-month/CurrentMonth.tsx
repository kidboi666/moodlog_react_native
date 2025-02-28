import { AnimatePresence, useEvent, YStack } from 'tamagui';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useState } from 'react';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/constants/size';
import { CollapsedContent } from '@/components/features/stats/expressive-month/CollapsedContent';
import { ExpandedContent } from '@/components/features/stats/expressive-month/ExpandedContent';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import { useStatistics } from '@/store/hooks/useStatistics';

const AnimatedCard = Animated.createAnimatedComponent(YStack);

export const CurrentMonth = () => {
  const { journalStats } = useStatistics();
  const [isExpanded, setIsExpanded] = useState(false);

  const onPress = useEvent(() => {
    setIsExpanded(prev => !prev);
  });

  const animatedStyle = useAnimatedStyle(() => ({
    height: withSpring(
      isExpanded ? RECORD_CARD_EXPANDED_HEIGHT : RECORD_CARD_HEIGHT,
    ),
  }));

  const { selectedMonthStats } = journalStats;

  return (
    <AnimatedCard
      flex={1}
      animation="quick"
      animateOnly={PRESS_STYLE_KEY}
      pressStyle={PRESS_STYLE}
      p="$4"
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
