import { useState } from 'react';

import * as S from 'src/core/components/features/statistics/selected-month/CurrentMonth.styled';

import { EmptyContent } from '@/core/components/features/statistics/EmptyContent';
import { CollapsedContent } from '@/core/components/features/statistics/selected-month/CollapsedContent';
import { ExpandedContent } from '@/core/components/features/statistics/selected-month/ExpandedContent';
import { useStatistics } from '@/core/store/contexts/statistics.context';

export const CurrentMonth = () => {
  const { selectedMonthStats } = useStatistics();
  const [isExpanded, setIsExpanded] = useState(false);

  const onPress = () => {
    if (selectedMonthStats) {
      setIsExpanded(prev => !prev);
      return;
    }
    return undefined;
  };

  return (
    <S.CardContainer onPress={onPress}>
      {!selectedMonthStats || selectedMonthStats.count === 0 ? (
        <EmptyContent />
      ) : isExpanded ? (
        <ExpandedContent selectedMonthStats={selectedMonthStats} />
      ) : (
        <CollapsedContent selectedMonthStats={selectedMonthStats} />
      )}
    </S.CardContainer>
  );
};
