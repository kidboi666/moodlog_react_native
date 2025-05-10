import Animated from 'react-native-reanimated'
import { YStack, styled } from 'tamagui'

import { PRESS_STYLE } from '@/constants'
import { useExpandAnimation, useMoodStats } from '@/hooks'
import { ExpansionState, ISOMonthString, TimeRange } from '@/types'
import { MoodAverageCollapsedContent } from './MoodAverageCollapsedContent'
import { MoodAverageExpandedContent } from './MoodAverageExpandedContent'

interface Props {
  selectedYear: number
  selectedMonth: ISOMonthString
}

export function MoodAverage({ selectedYear, selectedMonth }: Props) {
  const { stats } = useMoodStats(TimeRange.YEARLY, selectedYear, selectedMonth)
  const moodStats = stats.moodStats || {}
  const signatureMood = moodStats.signatureMood || {}
  const scoreBoard = moodStats.scoreBoard || {}
  const hasSignatureMood = !!signatureMood?.id

  const { animatedStyle, expansionState, onPress } = useExpandAnimation()
  const isCardExpanded = expansionState === ExpansionState.EXPANDED

  return (
    <AnimatedCardContainer onPress={onPress} style={animatedStyle}>
      {isCardExpanded ? (
        <MoodAverageExpandedContent scoreBoard={scoreBoard || {}} />
      ) : (
        <MoodAverageCollapsedContent
          signatureMood={signatureMood}
          hasSignatureMood={hasSignatureMood}
        />
      )}
    </AnimatedCardContainer>
  )
}

export const CardContainer = styled(YStack, {
  bg: '$gray4',
  rounded: '$8',
  p: '$4',
  animation: 'medium',
  pressStyle: PRESS_STYLE,

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg }
      },
    },
  } as const,
})

const AnimatedCardContainer = Animated.createAnimatedComponent(CardContainer)
