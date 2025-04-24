import Animated from 'react-native-reanimated'
import { YStack, styled } from 'tamagui'

import { useApp } from '@/store'
import { PRESS_STYLE } from 'shared/constants'
import { useExpandAnimation, useJournalStats } from 'shared/hooks'
import { ExpansionState, type ISOMonthString, TimeRange } from 'shared/types'
import { getDaysSinceSignup } from 'shared/utils'

import { TotalCountCollapsedContent } from './TotalCountCollapsedContent'
import { TotalCountExpandedContent } from './TotalCountExpandedContent'

const CardContainer = styled(YStack, {
  flex: 1,
  bg: '$gray4',
  rounded: '$8',
  p: '$4',
  animation: 'medium',
  pressStyle: PRESS_STYLE,
})

const AnimatedCardContainer = Animated.createAnimatedComponent(CardContainer)

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
        <TotalCountExpandedContent
          expressiveMonth={expressiveMonth}
          totalCount={totalCount}
          daysSinceSignup={daysSinceSignup}
          frequency={frequency}
          activeDay={activeDay}
        />
      ) : (
        <TotalCountCollapsedContent totalCount={totalCount} />
      )}
    </AnimatedCardContainer>
  )
}
