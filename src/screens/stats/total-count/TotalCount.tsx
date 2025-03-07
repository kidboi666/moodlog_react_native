import { AnimatePresence, useEvent, YStack } from 'tamagui';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/constants/size';
import { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { ExpandedContent } from '@/screens/stats/total-count/ExpandedContent';
import { CollapsedContent } from '@/screens/stats/total-count/CollapsedContent';
import { ExpressiveMonthStats, JournalStats } from '@/types/entries';

const AnimatedCard = Animated.createAnimatedComponent(YStack);

interface Props {
  journalStats: JournalStats;
  expressiveMonthStats: ExpressiveMonthStats;
  daysSinceSignup: number;
}

export const TotalCount = ({
  journalStats,
  daysSinceSignup,
  expressiveMonthStats,
}: Props) => {
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

  const { totalCount, totalFrequency, totalActiveDay } = journalStats;

  return (
    <AnimatedCard
      flex={1}
      onPressIn={() => (isTouched.value = true)}
      onPressOut={() => (isTouched.value = false)}
      bg="$gray4"
      rounded="$8"
      justify="space-between"
      p="$4"
      onPress={onPress}
      style={animatedStyle}
    >
      <AnimatePresence>
        {isExpanded ? (
          <ExpandedContent
            expressiveMonthStats={expressiveMonthStats}
            isExpanded={isExpanded}
            totalCount={totalCount}
            daysSinceSignup={daysSinceSignup}
            totalFrequency={totalFrequency}
            totalActiveDay={totalActiveDay}
          />
        ) : (
          <CollapsedContent
            isExpanded={isExpanded}
            journalStats={journalStats}
          />
        )}
      </AnimatePresence>
    </AnimatedCard>
  );
};
