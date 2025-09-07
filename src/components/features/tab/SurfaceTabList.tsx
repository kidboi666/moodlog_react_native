import { usePathname } from 'expo-router'
import { TabListProps } from 'expo-router/ui'
import { PropsWithChildren, forwardRef, useEffect } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { Surface } from 'react-native-paper'
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { DelayMS } from '@/src/constants'

export const SurfaceTabList = forwardRef<View, PropsWithChildren<TabListProps>>(
  ({ children, ...props }, ref) => {
    const pathname = usePathname()
    const shouldHide = pathname.startsWith('/write')
    const y = useSharedValue(0)
    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ translateY: y.value }],
    }))

    useEffect(() => {
      y.value = withTiming(shouldHide ? 120 : 0)
    }, [shouldHide])

    return (
      <Animated.View
        ref={ref}
        entering={FadeInDown.duration(DelayMS.ANIMATION.LONG)}
        style={[animatedStyles, styles.container]}
      >
        <Surface {...props} style={styles.list} elevation={2}>
          {children}
        </Surface>
      </Animated.View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  list: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
  },
})
