import Animated from 'react-native-reanimated'
import { YStack, styled } from 'tamagui'

import { PRESS_STYLE } from '@/constants'
import { useExpandAnimation, useJournalStats } from '@/hooks'
import { ExpansionState, type ISOMonthString, TimeRange } from '@/types'
import { TotalCountCollapsedContent } from './TotalCountCollapsedContent'
import { TotalCountExpandedContent } from './TotalCountExpandedContent'

interface Props {
  selectedYear: number
  selectedMonth: ISOMonthString
}

export function TotalCount({ selectedYear, selectedMonth }: Props) {
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
        <TotalCountExpandedContent
          expressiveMonth={expressiveMonth}
          totalCount={totalCount}
          frequency={frequency}
          activeDay={activeDay}
        />
      ) : (
        <TotalCountCollapsedContent totalCount={totalCount} />
      )}
    </AnimatedCardContainer>
  )
}

const CardContainer = styled(YStack, {
  flex: 1,
  bg: '$gray4',
  rounded: '$8',
  p: '$4',
  animation: 'medium',
  pressStyle: PRESS_STYLE,
})

const AnimatedCardContainer = Animated.createAnimatedComponent(CardContainer)
