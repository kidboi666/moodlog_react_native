import Animated from 'react-native-reanimated'

import { useApp } from '@/store'
import type { ISOMonthString } from '@/types'
import { ExpansionState, TimeRange } from '@/types'

import { CollapsedContent } from '@/components/features/statistics/mood-average/CollapsedContent'
import { ExpandedContent } from '@/components/features/statistics/mood-average/ExpandedContent'
import { useExpandAnimation } from '@/hooks/useExpandAnimation'
import { useMoodStats } from '@/hooks/useMoodStats'
import * as S from './MoodAverage.styled'

const AnimatedCardContainer = Animated.createAnimatedComponent(S.CardContainer)

interface Props {
  selectedYear: number
  selectedMonth: ISOMonthString
}

export const MoodAverage = ({ selectedYear, selectedMonth }: Props) => {
  const { stats } = useMoodStats(TimeRange.YEARLY, selectedYear, selectedMonth)
  const { moodStats } = stats || {}
  const { signatureMood, scoreBoard } = moodStats || {}
  const { animatedStyle, expansionState, onPress } = useExpandAnimation()
  const emotionDisplayType = useApp(state => state.settings.emotionDisplayType)
  const emotionDisplaySettings = useApp(
    state => state.settings.emotionDisplaySettings || {},
  )

  // 선택된 달에 특정 감정 선택 로직이 설정되어 있으면 그것을 사용
  const shouldShowSignatureMood = !!signatureMood?.type

  return (
    <AnimatedCardContainer onPress={onPress} style={animatedStyle}>
      {expansionState === ExpansionState.EXPANDED ? (
        <ExpandedContent
          scoreBoard={scoreBoard || {}}
          hasSignatureMood={shouldShowSignatureMood}
        />
      ) : (
        <CollapsedContent
          signatureMood={signatureMood}
          hasSignatureMood={shouldShowSignatureMood}
        />
      )}
    </AnimatedCardContainer>
  )
}
