import { ReactNode, Ref, forwardRef } from 'react'
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Layout } from '@/src/constants'

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
      Omit<ScrollViewProps, 'style' | 'contentContainerStyle'> & {
        style?: ScrollViewProps['style']
        contentContainerStyle?: ScrollViewProps['contentContainerStyle']
      })
  | (NonScrollableProps &
      Omit<ViewProps, 'style'> & { style?: ViewProps['style'] })

export const ScreenView = forwardRef<ScrollView | View, ScreenViewProps>(
  (props, ref) => {
    const { edges, padded, Header, withScroll, style, ...restProps } = props
    const insets = useSafeAreaInsets()

    const marginTop = edges?.includes('top') ? insets.top : 0

    const marginBottom = edges?.includes('bottom') ? insets.bottom : 0

    const paddingBottom = padded
      ? Layout.SPACE.CONTAINER_PADDING_BOTTOM
      : Layout.SPACE.HEADER_VERTICAL_PADDING

    if (withScroll) {
      const { contentContainerStyle, ...scrollProps } =
        restProps as ScrollViewProps

      return (
        <ScrollView
          ref={ref as Ref<ScrollView>}
          style={[{ marginTop, marginBottom }, style]}
          contentContainerStyle={[
            styles.scrollView,
            { paddingBottom },
            contentContainerStyle,
          ]}
          {...scrollProps}
        >
          {Header}
          {restProps.children}
        </ScrollView>
      )
    }

    return (
      <View
        ref={ref as Ref<View>}
        style={[styles.view, { marginTop, marginBottom, paddingBottom }, style]}
        {...(restProps as ViewProps)}
      >
        {Header}
        {restProps.children}
      </View>
    )
  },
)

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
  },
  view: {
    flex: 1,
    paddingTop: Layout.SPACE.HEADER_VERTICAL_PADDING,
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
  },
})

ScreenView.displayName = 'ScreenView'
