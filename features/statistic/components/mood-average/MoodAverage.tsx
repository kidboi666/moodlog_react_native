import Animated from 'react-native-reanimated'
import { YStack, styled } from 'tamagui'

import { PRESS_STYLE } from '@/shared/constants'
import { useExpandAnimation, useMoodStats } from '@/shared/hooks'
import { ExpansionState, ISOMonthString, TimeRange } from '@/shared/types'

import { MoodAverageCollapsedContent } from './MoodAverageCollapsedContent'
import { MoodAverageExpandedContent } from './MoodAverageExpandedContent'

export const CardContainer = styled(YStack, {
  flex: 1,
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

interface Props {
  selectedYear: number
  selectedMonth: ISOMonthString
}

export const MoodAverage = ({ selectedYear, selectedMonth }: Props) => {
  const { stats } = useMoodStats(TimeRange.YEARLY, selectedYear, selectedMonth)
  const { moodStats } = stats || {}
  const { signatureMood, scoreBoard } = moodStats || {}
  const { animatedStyle, expansionState, onPress } = useExpandAnimation()

  const shouldShowSignatureMood = !!signatureMood?.type

  return (
    <AnimatedCardContainer onPress={onPress} style={animatedStyle}>
      {expansionState === ExpansionState.EXPANDED ? (
        <MoodAverageExpandedContent
          scoreBoard={scoreBoard || {}}
          hasSignatureMood={shouldShowSignatureMood}
        />
      ) : (
        <MoodAverageCollapsedContent
          signatureMood={signatureMood}
          hasSignatureMood={shouldShowSignatureMood}
        />
      )}
    </AnimatedCardContainer>
  )
}
