import { useRef, useState } from 'react'
import { Animated } from 'react-native'
import { State } from 'react-native-gesture-handler'

export function useImageZoom() {
  const [currentScale, setCurrentScale] = useState(1)
  const scale = useRef(new Animated.Value(1)).current
  const pinchRef = useRef(null)
  const resetScale = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setCurrentScale(1))
  }
  const zoomIn = () => {
    Animated.timing(scale, {
      toValue: 2,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setCurrentScale(2))
  }
  const handlePinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    { useNativeDriver: true },
  )

  const handlePinchHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const newScale = currentScale * (event.nativeEvent.scale || 1)
      setCurrentScale(newScale)
      scale.setValue(newScale)
      if (newScale < 0.9) {
        resetScale()
      }
    }
  }

  const handleLongPress = () => {
    if (currentScale !== 1) {
      resetScale()
    } else {
      zoomIn()
    }
  }

  return {
    scale,
    pinchRef,
    onPinchGestureEvent: handlePinchGestureEvent,
    onPinchHandlerStateChange: handlePinchHandlerStateChange,
    onLongPress: handleLongPress,
  }
}
