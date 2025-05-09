import React, { useState } from 'react'
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface Props {
  onPress: () => void
  title: string
  style: StyleProp<ViewStyle>
  textStyle: StyleProp<TextStyle>
  rippleColor: string
  buttonColor: string
}

export const RippleButton = ({
  onPress,
  title,
  style,
  textStyle,
  rippleColor = 'rgba(0, 0, 0, 0.1)',
  buttonColor = '#3498db',
}: Props) => {
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 })
  const scale = useSharedValue(0)
  const opacity = useSharedValue(0.5)

  const rippleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }
  })

  const handlePress = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    const { locationX, locationY } = event.nativeEvent
    setRipplePosition({ x: locationX, y: locationY })

    scale.value = 0
    opacity.value = 0.5

    scale.value = withSequence(
      withTiming(1, { duration: 400 }),
      withTiming(1.8, { duration: 400 }),
    )

    opacity.value = withTiming(0, { duration: 800 }, () => {
      if (onPress) {
        runOnJS(onPress)()
      }
    })
  }

  return (
    <Pressable
      style={[styles.button, { backgroundColor: buttonColor }, style]}
      onPress={handlePress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
      <View style={styles.rippleContainer} pointerEvents='none'>
        <Animated.View
          style={[
            styles.ripple,
            {
              backgroundColor: rippleColor,
              left: ripplePosition.x - 150, // 크기의 절반
              top: ripplePosition.y - 150, // 크기의 절반
            },
            rippleStyle,
          ]}
        />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rippleContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  ripple: {
    width: 300, // 충분히 큰 원
    height: 300, // 충분히 큰 원
    borderRadius: 150,
    position: 'absolute',
  },
})
