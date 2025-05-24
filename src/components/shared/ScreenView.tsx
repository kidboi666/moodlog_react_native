import { ReactNode, Ref, forwardRef, useMemo } from 'react'
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Layout } from '@/constants'

interface BaseProps {
  edges?: Array<'top' | 'bottom'>
  Header?: ReactNode
  padded?: boolean
}

interface ScrollableProps extends BaseProps {
  withScroll: true
}

interface NonScrollableProps extends BaseProps {
  withScroll?: false
}

type ScreenViewProps =
  | (ScrollableProps &
      Omit<ScrollViewProps, 'style'> & { style?: ScrollViewProps['style'] })
  | (NonScrollableProps &
      Omit<ViewProps, 'style'> & { style?: ViewProps['style'] })

export const ScreenView = forwardRef<ScrollView | View, ScreenViewProps>(
  ({ edges, padded, Header, style, withScroll, ...props }, ref) => {
    const insets = useSafeAreaInsets()
    const containerStyles = useMemo(
      () => ({
        marginTop: edges?.includes('top')
          ? insets.top + Layout.SPACE.CONTAINER_MARGIN_TOP
          : 0,
        marginBottom: edges?.includes('bottom')
          ? insets.bottom + Layout.SPACE.CONTAINER_VERTICAL_PADDING
          : 0,
        paddingBottom: padded ? Layout.SPACE.CONTAINER_PADDING_BOTTOM : 0,
      }),
      [padded, edges, insets.top, insets.bottom],
    )

    return withScroll ? (
      <ScrollView
        ref={ref as Ref<ScrollView>}
        style={[styles.container]}
        contentContainerStyle={[containerStyles, style]}
        {...(props as ScrollViewProps)}
      >
        {Header}
        {props.children}
      </ScrollView>
    ) : (
      <View
        ref={ref as Ref<View>}
        style={[styles.container, containerStyles, style]}
        {...(props as ViewProps)}
      >
        {Header}
        {props.children}
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
  },
})

ScreenView.displayName = 'ScreenView'
