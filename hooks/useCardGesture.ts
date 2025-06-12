import { useCallback, useEffect, useState } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const timingOption = { duration: 300, easing: Easing.inOut(Easing.cubic) }

export const useCardGesture = () => {
  const translateValue = useSharedValue(0)
  const [showActionButton, setShowActionButton] = useState(false)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateValue.value }],
  }))

  const toggleState = useCallback(() => {
    setShowActionButton(prev => !prev)
  }, [])

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate(event => {
      translateValue.value = event.translationX
    })
    .onEnd(event => {
      if (showActionButton && event.translationX < 0) {
        translateValue.value = withTiming(-80, timingOption)
      } else if (event.translationX < -80) {
        // left swipe
        translateValue.value = withTiming(-80, timingOption)
        runOnJS(setShowActionButton)(true)
      } else {
        // right swipe
        translateValue.value = withTiming(0, timingOption)
        runOnJS(setShowActionButton)(false)
      }
    })

  const longPressGesture = Gesture.LongPress()
    .minDuration(300)
    .onStart(() => {
      if (showActionButton) {
        translateValue.value = withTiming(0, timingOption)
        runOnJS(setShowActionButton)(false)
      } else {
        translateValue.value = withTiming(-80, timingOption)
        runOnJS(setShowActionButton)(true)
      }
    })

  const gesture = Gesture.Exclusive(panGesture, longPressGesture)

  useEffect(() => {
    if (showActionButton) {
      translateValue.value = withTiming(-80, timingOption)
    } else {
      translateValue.value = withTiming(0, timingOption)
    }
  })

  return {
    gesture,
    GestureWrapper: GestureDetector,
    showActionButton,
    animatedStyle,
    toggleState,
  }
}
