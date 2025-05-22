import { Ionicons } from '@expo/vector-icons'
import { TabTriggerSlotProps } from 'expo-router/ui'
import React, { ComponentProps, forwardRef, Ref } from 'react'
import { Pressable, PressableProps, StyleSheet, View } from 'react-native'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'

import { useColors } from '@/hooks/useColors'

type Icon = ComponentProps<typeof Ionicons>['name']
export type TabButtonProps = TabTriggerSlotProps & {
  icon?: Icon
}

export const TabButton = forwardRef<Ref<PressableProps>, TabButtonProps>(
  ({ icon, isFocused, ...props }, ref) => {
    const { colors } = useColors()
    const animatedButtonStyle = useAnimatedStyle(
      () => ({
        backgroundColor: withTiming(
          isFocused ? colors.background.pure : colors.background.primary,
          {
            duration: 300,
          },
        ),
      }),
      [isFocused],
    )

    return (
      <Pressable
        ref={ref}
        {...props}
        style={[styles.button, animatedButtonStyle]}
        android_ripple={{
          color: 'rgba(0, 0, 0, 0.2)',
          borderless: true,
          foreground: true,
        }}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name={icon} size={20} color={colors.border.focus} />
      </Pressable>
    )
  },
)

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
