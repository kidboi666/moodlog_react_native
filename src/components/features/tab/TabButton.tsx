import { TabTriggerSlotProps } from 'expo-router/ui'
import React, { forwardRef, Ref } from 'react'
import { View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

export type TabButtonProps = TabTriggerSlotProps & {
  icon: IconSource
}

export const TabButton = forwardRef<Ref<View>, TabButtonProps>(
  ({ icon, isFocused, ...props }, ref) => {
    // @ts-ignore
    return <IconButton ref={ref} {...props} icon={icon} selected={isFocused} />
  },
)
