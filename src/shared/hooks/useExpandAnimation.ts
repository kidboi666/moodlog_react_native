import { useCallback, useState } from 'react'
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { LAYOUT } from '@/src/shared/constants'
import { ExpansionState } from '@/src/shared/types'

export const useExpandAnimation = () => {
  const [expansionState, setExpansionState] = useState<ExpansionState>(
    ExpansionState.COLLAPSED,
  )
  const height = useSharedValue(LAYOUT.HEIGHT.RECORD_CARD_HEIGHT)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    }
  })

  const handlePress = useCallback(() => {
    const newState =
      expansionState === ExpansionState.EXPANDED
        ? ExpansionState.COLLAPSED
        : ExpansionState.EXPANDED

    runOnJS(setExpansionState)(newState)

    height.value = withSpring(
      newState === ExpansionState.EXPANDED
        ? LAYOUT.HEIGHT.RECORD_CARD_EXPANDED_HEIGHT
        : LAYOUT.HEIGHT.RECORD_CARD_HEIGHT,
    )
  }, [expansionState, height])

  return {
    expansionState,
    animatedStyle,
    onPress: handlePress,
  }
}
