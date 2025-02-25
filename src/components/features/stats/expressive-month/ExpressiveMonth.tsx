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
import { getExpressiveMonthString } from '@/utils/common';
import { CollapsedContent } from '@/components/features/stats/expressive-month/CollapsedContent';
import { ExpandedContent } from '@/components/features/stats/expressive-month/ExpandedContent';

interface Props {
  journalStats: JournalStats;
}

const AnimatedCard = Animated.createAnimatedComponent(YStack);

export const ExpressiveMonth = ({ journalStats }: Props) => {
  const expressiveMonth = journalStats.expressiveMonth;
  const expressiveMonthString = getExpressiveMonthString(expressiveMonth.month);
  const [isExpanded, setIsExpanded] = useState(false);

  const onPress = useEvent(() => {
    setIsExpanded(prev => !prev);
  });

  const animatedStyle = useAnimatedStyle(() => ({
    height: withSpring(
      isExpanded ? RECORD_CARD_EXPANDED_HEIGHT : RECORD_CARD_HEIGHT,
    ),
  }));

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
            isExpanded={isExpanded}
            expressiveMonth={expressiveMonth}
            expressiveMonthString={expressiveMonthString}
          />
        ) : (
          <CollapsedContent
            isExpanded={isExpanded}
            expressiveMonthString={expressiveMonthString}
          />
        )}
      </AnimatePresence>
    </AnimatedCard>
  );
};
