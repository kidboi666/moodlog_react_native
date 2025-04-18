import Animated from 'react-native-reanimated'

import { moodTheme } from '@/constants'
import { useMoodStats } from '@/hooks/useMoodStats'
import {
  ExpansionState,
  type ISOMonthString,
  MoodLevel,
  type MoodType,
  TimeRange,
} from '@/types'

import { CollapsedContent } from '@/components/features/statistics/mood-average/CollapsedContent'
import { ExpandedContent } from '@/components/features/statistics/mood-average/ExpandedContent'
import { useExpandAnimation } from '@/hooks/useExpandAnimation'
import * as S from './MoodAverage.styled'

const AnimatedCardContainer = Animated.createAnimatedComponent(S.CardContainer)

interface Props {
  selectedYear: number
  selectedMonth: ISOMonthString
}

export const MoodAverage = ({ selectedYear, selectedMonth }: Props) => {
  const { stats } = useMoodStats(TimeRange.YEARLY, selectedYear, selectedMonth)
  const { expansionState, onPress, animatedStyle } = useExpandAnimation()
  const {
    moodStats: { signatureMood, scoreBoard },
  } = stats || {}
  const hasSignatureMood = signatureMood ? signatureMood?.count > 0 : false
  const bgColor =
    expansionState === ExpansionState.EXPANDED
      ? '$colo4'
      : hasSignatureMood
        ? moodTheme[signatureMood?.type as MoodType][MoodLevel.FULL]
        : '$color4'

  return (
    <AnimatedCardContainer
      moodColor={bgColor}
      onPress={onPress}
      style={animatedStyle}
    >
      {expansionState === ExpansionState.EXPANDED ? (
        <ExpandedContent
          hasSignatureMood={hasSignatureMood}
          scoreBoard={scoreBoard}
        />
      ) : (
        <CollapsedContent
          hasSignatureMood={hasSignatureMood}
          signatureMood={signatureMood}
        />
      )}
    </AnimatedCardContainer>
  )
}
