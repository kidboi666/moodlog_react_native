import { TabListProps } from 'expo-router/ui'
import { PropsWithChildren, forwardRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Surface } from 'react-native-paper'

export const SurfaceTabList = forwardRef<View, PropsWithChildren<TabListProps>>(
  ({ children, ...props }, ref) => {
    return (
      <View ref={ref} style={styles.container}>
        <Surface {...props} style={styles.list} elevation={2}>
          {children}
        </Surface>
      </View>
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
    paddingVertical: 12,
  },
})
