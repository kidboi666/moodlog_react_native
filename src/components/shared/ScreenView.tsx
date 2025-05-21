import { ReactNode, useMemo } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Layout } from '@/constants'

interface ViewContainerProps extends ViewProps {
  edges?: Array<'top' | 'bottom'>
  Header?: ReactNode
  padded?: boolean
}

export function ScreenView({
  edges,
  padded,
  Header,
  style,
  ...props
}: ViewContainerProps) {
  const insets = useSafeAreaInsets()
  const memoizedStyle = useMemo(
    () => ({
      marginTop: edges?.includes('top')
        ? insets.top + Layout.SPACE.CONTAINER_MARGIN_TOP
        : 0,
      marginBottom: edges?.includes('bottom')
        ? insets.bottom + Layout.SPACE.CONTAINER_VERTICAL_PADDING
        : 0,
      paddingBottom: padded ? Layout.SPACE.CONTAINER_PADDING_BOTTOM : 0,
    }),
    [padded, edges],
  )

  return (
    <View style={[styles.container, memoizedStyle, style]} {...props}>
      {Header && Header}
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
  },
})
