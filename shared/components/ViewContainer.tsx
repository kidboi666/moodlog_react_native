import type { ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, ViewProps, styled } from 'tamagui'

import { Layout } from '@/shared/constants'

interface ViewContainerProps extends ViewProps {
  edges?: Array<'top' | 'bottom'>
  Header?: ReactNode
  padded?: boolean
}

export const ViewContainer = View.styleable<ViewContainerProps>(
  ({ children, Header, padded, edges, ...props }, ref) => {
    const insets = useSafeAreaInsets()

    const topEdge = edges?.includes('top')
      ? insets.top + Layout.SPACE.CONTAINER_MARGIN_TOP
      : 0
    const bottomEdge = edges?.includes('bottom')
      ? insets.bottom + Layout.SPACE.CONTAINER_VERTICAL_PADDING
      : 0

    return (
      <StyledViewContainer
        padded={padded}
        topEdge={topEdge}
        bottomEdge={bottomEdge}
        ref={ref}
        {...props}
      >
        {Header && Header}
        {children}
      </StyledViewContainer>
    )
  },
)

export const StyledViewContainer = styled(View, {
  flex: 1,
  px: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,

  variants: {
    padded: {
      true: {
        pb: Layout.SPACE.CONTAINER_PADDING_BOTTOM,
      },
    },
    topEdge: {
      ':number': mt => {
        return { mt }
      },
    },
    bottomEdge: {
      ':number': mb => {
        return { mb }
      },
    },
  } as const,
})

ViewContainer.displayName = 'ViewContainer'
