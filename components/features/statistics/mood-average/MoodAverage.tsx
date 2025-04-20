import Animated from 'react-native-reanimated'

import type { ISOMonthString } from '@/types'
import { ExpansionState, TimeRange } from '@/types'

import { useExpandAnimation, useMoodStats } from '@/hooks'

import { YStack, styled } from 'tamagui'
import { MoodAverageCollapsedContent } from './MoodAverageCollapsedContent'
import { MoodAverageExpandedContent } from './MoodAverageExpandedContent'

import { PRESS_STYLE } from '@/constants/animations'

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

  // 선택된 달에 특정 감정 선택 로직이 설정되어 있으면 그것을 사용
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
