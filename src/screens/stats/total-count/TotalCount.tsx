import { AnimatePresence, useEvent } from 'tamagui';
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
import * as S from './TotalCount.styled';

const AnimatedCard = Animated.createAnimatedComponent(S.CardContainer);

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
      onPressIn={() => (isTouched.value = true)}
      onPressOut={() => (isTouched.value = false)}
      onPress={onPress}
      style={animatedStyle}
    >
      <AnimatePresence>
        {isExpanded ? (
          <ExpandedContent
            expressiveMonthStats={expressiveMonthStats}
            totalCount={totalCount}
            daysSinceSignup={daysSinceSignup}
            totalFrequency={totalFrequency}
            totalActiveDay={totalActiveDay}
          />
        ) : (
          <CollapsedContent journalStats={journalStats} />
        )}
      </AnimatePresence>
    </AnimatedCard>
  );
};
