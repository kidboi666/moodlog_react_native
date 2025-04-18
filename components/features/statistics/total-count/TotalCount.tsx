import Animated from 'react-native-reanimated'

import { useApp } from '@/store'
import type { ISOMonthString } from '@/types'
import { ExpansionState, TimeRange } from '@/types'
import { getDaysSinceSignup } from '@/utils'

import { CollapsedContent } from '@/components/features/statistics/total-count/CollapsedContent'
import { ExpandedContent } from '@/components/features/statistics/total-count/ExpandedContent'
import { useExpandAnimation } from '@/hooks/useExpandAnimation'
import { useJournalStats } from '@/hooks/useJournalStats'
import * as S from './TotalCount.styled'

const AnimatedCardContainer = Animated.createAnimatedComponent(S.CardContainer)

interface Props {
  selectedYear: number
  selectedMonth: ISOMonthString
}

export const TotalCount = ({ selectedYear, selectedMonth }: Props) => {
  const firstLaunchDate = useApp(state => state.firstLaunchDate)
  const daysSinceSignup = getDaysSinceSignup(firstLaunchDate!)
  const { stats } = useJournalStats(
    TimeRange.YEARLY,
    selectedYear,
    selectedMonth,
  )
  const { animatedStyle, expansionState, onPress } = useExpandAnimation()

  const { expressiveMonth, totalCount, frequency, activeDay } = stats || {}

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
  )
}
