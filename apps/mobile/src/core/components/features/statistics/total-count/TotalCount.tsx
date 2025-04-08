import Animated from 'react-native-reanimated';

import * as S from 'src/core/components/features/statistics/total-count/TotalCount.styled';

import { CollapsedContent } from '@/core/components/features/statistics/total-count/CollapsedContent';
import { ExpandedContent } from '@/core/components/features/statistics/total-count/ExpandedContent';
import { useExpandAnimation } from '@/core/hooks/useExpandAnimation';
import { useJournalStats } from '@/core/hooks/useJournalStats';
import { useUser } from '@/core/store/user.store';

import { ISOMonthString } from '@/types/date.types';
import { ExpansionState, TimeRange } from '@/types/statistic.types';

const AnimatedCardContainer = Animated.createAnimatedComponent(S.CardContainer);

interface Props {
  timeRange: TimeRange;
  selectedYear: number;
  selectedMonth: ISOMonthString;
}

export const TotalCount = ({
  timeRange,
  selectedYear,
  selectedMonth,
}: Props) => {
  const userInfo = useUser(state => state.userInfo);
  const { daysSinceSignup } = userInfo ?? null;
  const { stats } = useJournalStats(timeRange, selectedYear, selectedMonth);
  const { animatedStyle, expansionState, onPress } = useExpandAnimation();

  const { expressiveMonth, totalCount, frequency, activeDay } = stats || {};

  return (
    <AnimatedCardContainer onPress={onPress} style={animatedStyle}>
      {expansionState === ExpansionState.EXPANDED ? (
        <ExpandedContent
          expressiveMonth={expressiveMonth}
          totalCount={totalCount}
          daysSinceSignup={daysSinceSignup}
          frequency={frequency}
          activeDay={activeDay}
        />
      ) : (
        <CollapsedContent totalCount={totalCount} />
      )}
    </AnimatedCardContainer>
  );
};
