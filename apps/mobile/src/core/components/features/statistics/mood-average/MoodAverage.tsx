import Animated from 'react-native-reanimated'

import { CollapsedContent } from '@/core/components/features/statistics/mood-average/CollapsedContent'
import { ExpandedContent } from '@/core/components/features/statistics/mood-average/ExpandedContent'
import { moodTheme } from '@/core/constants/themes'
import { useExpandAnimation } from '@/core/hooks/useExpandAnimation'
import { useMoodStats } from '@/core/hooks/useMoodStats'
import type { ISOMonthString } from '@/types/date.types'
import { MoodLevel, type MoodType } from '@/types/mood.types'
import { ExpansionState, type TimeRange } from '@/types/statistic.types'
import * as S from './MoodAverage.styled'

const AnimatedCardContainer = Animated.createAnimatedComponent(S.CardContainer)

interface Props {
  timeRange: TimeRange
  selectedYear: number
  selectedMonth: ISOMonthString
}

export const MoodAverage = ({
  timeRange,
  selectedYear,
  selectedMonth,
}: Props) => {
  const { stats } = useMoodStats(timeRange, selectedYear, selectedMonth)
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
        <ExpandedContent scoreBoard={scoreBoard} />
      ) : (
        <CollapsedContent
          hasSignatureMood={hasSignatureMood}
          signatureMood={signatureMood}
        />
      )}
    </AnimatedCardContainer>
  )
}
