import { Colors } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { TabTriggerSlotProps } from 'expo-router/ui'
import React, { ComponentProps, forwardRef, Ref } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'

type Icon = ComponentProps<typeof Ionicons>['name']

export type TabButtonProps = TabTriggerSlotProps & {
  icon?: Icon
  ref: Ref<View>
}

export const TabButton = forwardRef<Ref<View>, TabButtonProps>(
  ({ icon, isFocused, ...props }, ref) => {
    const animatedButtonStyle = useAnimatedStyle(
      () => ({
        backgroundColor: withTiming(isFocused ? Colors.gray6 : Colors.gray9, {
          duration: 300,
        }),
      }),
      [isFocused],
    )
    console.log(isFocused)
    return (
      <Pressable
        {...props}
        style={[styles.button, animatedButtonStyle]}
        android_ripple={{
          color: 'rgba(0, 0, 0, 0.2)',
          borderless: true,
          foreground: true,
        }}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name={icon} size={20} color={Colors.gray10} />
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
