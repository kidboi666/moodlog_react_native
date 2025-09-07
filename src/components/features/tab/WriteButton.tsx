import React, { forwardRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, IconButtonProps, useTheme } from 'react-native-paper'

import { useRouter } from 'expo-router'

export const WriteButton = forwardRef<View, Pick<IconButtonProps, 'style'>>(
  ({ style }, ref) => {
    const router = useRouter()
    const { colors } = useTheme()
    return (
      <View ref={ref}>
        <IconButton
          icon='plus'
          mode='contained'
          iconColor={colors.surface}
          containerColor={colors.primary}
          style={[styles.button, style]}
          onPress={() => router.push('/write')}
        />
      </View>
    )
  },
)

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
  },
})
