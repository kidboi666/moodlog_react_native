import { AnimatePresence, useEvent, YStack } from 'tamagui';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/constants/size';
import { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { ExpandedContent } from '@/components/features/stats/total-count/ExpandedContent';
import { CollapsedContent } from '@/components/features/stats/total-count/CollapsedContent';
import { JournalStats } from '@/types/entries';

const AnimatedCard = Animated.createAnimatedComponent(YStack);

interface Props {
  journalStats: JournalStats;
  daysSinceSignup: number;
}

export const TotalCount = ({ journalStats, daysSinceSignup }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onPress = useEvent(() => {
    setIsExpanded(prev => !prev);
  });

  const animatedStyle = useAnimatedStyle(() => ({
    height: withSpring(
      isExpanded ? RECORD_CARD_EXPANDED_HEIGHT : RECORD_CARD_HEIGHT,
    ),
  }));
  const { totalCount, totalFrequency, totalActiveDay, expressiveMonth } =
    journalStats;

  return (
    <AnimatedCard
      flex={1}
      bg="$gray5"
      rounded="$8"
      justify="space-between"
      p="$4"
      onPress={onPress}
      style={animatedStyle}
    >
      <AnimatePresence>
        {isExpanded ? (
          <ExpandedContent
            expressiveMonth={expressiveMonth}
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
