import type { PropsWithChildren } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

export const BottomSheetContainer = ({
  children,
  style,
  ...props
}: PropsWithChildren<ViewProps>) => {
  return (
    <View {...props} style={[styles.container, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 20,
  },
})
