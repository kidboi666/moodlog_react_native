import { useQuery } from '@tanstack/react-query'
import Animated from 'react-native-reanimated'
import { YStack, styled } from 'tamagui'

import { PRESS_STYLE } from '@/constants'
import { useExpandAnimation } from '@/hooks'
import { StatisticQueries } from '@/queries'
import { ExpansionState, type ISOMonthString } from '@/types'
import { TotalCountCollapsedContent } from './TotalCountCollapsedContent'
import { TotalCountExpandedContent } from './TotalCountExpandedContent'

interface Props {
  selectedYear: number
  selectedMonth: ISOMonthString
}

export function TotalCount({ selectedYear, selectedMonth }: Props) {
  const { animatedStyle, expansionState, onPress } = useExpandAnimation()
  const { data: totalCount } = useQuery(StatisticQueries.getTotalCount())
  const expressiveMonth = '2021-01'
  const frequency = 10
  console.log('asdf', totalCount)
  const activeDay = 10

  return (
    <AnimatedCardContainer onPress={onPress} style={animatedStyle}>
      {expansionState === ExpansionState.EXPANDED ? (
        <TotalCountExpandedContent
          expressiveMonth={expressiveMonth}
          totalCount={totalCount ?? 3}
          frequency={frequency}
          activeDay={activeDay}
        />
      ) : (
        <TotalCountCollapsedContent totalCount={totalCount ?? 3} />
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
