import { AnimatePresence, useEvent, YStack } from 'tamagui';
import { JournalStats } from '@/types/entries';
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

interface Props {
  journalStats: JournalStats;
}

const AnimatedCard = Animated.createAnimatedComponent(YStack);

export const ExpressiveMonth = ({ journalStats }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onPress = useEvent(() => {
    setIsExpanded(prev => !prev);
  });

  const animatedStyle = useAnimatedStyle(() => ({
    height: withSpring(
      isExpanded ? RECORD_CARD_EXPANDED_HEIGHT : RECORD_CARD_HEIGHT,
    ),
  }));

  const { monthlyFrequency, monthlyActiveDay, expressiveMonth } = journalStats;

  return (
    <AnimatedCard
      flex={1}
      p="$4"
      bg="$gray5"
      rounded="$8"
      onPress={onPress}
      style={animatedStyle}
    >
      <AnimatePresence>
        {isExpanded ? (
          <ExpandedContent
            monthlyActiveDay={monthlyActiveDay}
            monthlyFrequency={monthlyFrequency}
            isExpanded={isExpanded}
            expressiveMonth={expressiveMonth}
          />
        ) : (
          <CollapsedContent
            isExpanded={isExpanded}
            expressiveMonth={expressiveMonth}
          />
        )}
      </AnimatePresence>
    </AnimatedCard>
  );
};
