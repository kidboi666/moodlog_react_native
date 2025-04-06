import { CollapsedContent } from '@/core/components/features/statistics/total-count/CollapsedContent';
import { ExpandedContent } from '@/core/components/features/statistics/total-count/ExpandedContent';
import { useExpandAnimation } from '@/core/hooks/useExpandAnimation';
import { useJournalStats } from '@/core/hooks/useJournalStats';
import { useUser } from '@/core/store/contexts/user.context';
import { ISOMonthString } from '@/types/date.types';

import { ExpansionState, TimeRange } from '@/types/statistic.types';
import Animated from 'react-native-reanimated';
import * as S from 'src/core/components/features/statistics/total-count/TotalCount.styled';

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
  const { stats } = useJournalStats(timeRange, selectedYear, selectedMonth);
  const { userInfo } = useUser();
  const { daysSinceSignup } = userInfo ?? null;
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
