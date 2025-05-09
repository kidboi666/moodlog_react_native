import { useCallback, useState } from 'react'
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { Layout } from 'constants'
import { ExpansionState } from 'types'

export const useExpandAnimation = () => {
  const [expansionState, setExpansionState] = useState<ExpansionState>(
    ExpansionState.COLLAPSED,
  )
  const height = useSharedValue(Layout.HEIGHT.RECORD_CARD_HEIGHT)

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
        ? Layout.HEIGHT.RECORD_CARD_EXPANDED_HEIGHT
        : Layout.HEIGHT.RECORD_CARD_HEIGHT,
    )
  }, [expansionState, height])

  return {
    expansionState,
    animatedStyle,
    onPress: handlePress,
  }
}
