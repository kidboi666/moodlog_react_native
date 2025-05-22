import { ReactNode, useMemo } from 'react'
import { ScrollView, StyleSheet, View, ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Layout } from '@/constants'

interface ViewContainerProps extends ViewProps {
  edges?: Array<'top' | 'bottom'>
  Header?: ReactNode
  padded?: boolean
  withScroll?: boolean
}

export function ScreenView({
  edges,
  padded,
  Header,
  style,
  withScroll,
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

  return withScroll ? (
    <ScrollView style={[styles.scrollView, memoizedStyle, style]} {...props}>
      {Header && Header}
      {props.children}
    </ScrollView>
  ) : (
    <View style={[styles.view, memoizedStyle, style]} {...props}>
      {Header && Header}
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
  },
  view: {
    flex: 1,
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
  },
})
