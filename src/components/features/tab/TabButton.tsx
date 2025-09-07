import { TabTriggerSlotProps } from 'expo-router/ui'
import React, { forwardRef } from 'react'
import { View } from 'react-native'
import { IconButton, IconButtonProps } from 'react-native-paper'

export type TabButtonProps = TabTriggerSlotProps & IconButtonProps

export const TabButton = forwardRef<View, TabButtonProps>(
  ({ icon, isFocused, ...props }, ref) => {
    return (
      <View ref={ref}>
        <IconButton icon={icon} selected={isFocused} animated {...props} />
      </View>
    )
  },
)
