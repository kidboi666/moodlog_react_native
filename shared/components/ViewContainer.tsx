import type { ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, ViewProps, styled } from 'tamagui'

import {
  CONTAINER_HORIZONTAL_PADDING,
  CONTAINER_MARGIN_TOP,
  CONTAINER_PADDING_BOTTOM,
  CONTAINER_VERTICAL_PADDING,
} from 'shared/constants'

export const StyledViewContainer = styled(View, {
  flex: 1,
  px: CONTAINER_HORIZONTAL_PADDING,

  variants: {
    padded: {
      true: {
        pb: CONTAINER_PADDING_BOTTOM,
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

interface ViewContainerProps extends ViewProps {
  edges?: Array<'top' | 'bottom'>
  Header?: ReactNode
  padded?: boolean
}

export const ViewContainer = StyledViewContainer.styleable<ViewContainerProps>(
  ({ children, Header, padded, edges, ...props }, ref) => {
    const insets = useSafeAreaInsets()

    return (
      <StyledViewContainer
        padded={padded}
        topEdge={edges?.includes('top') ? insets.top + CONTAINER_MARGIN_TOP : 0}
        bottomEdge={
          edges?.includes('bottom')
            ? insets.bottom + CONTAINER_VERTICAL_PADDING
            : 0
        }
        ref={ref}
        {...props}
      >
        {Header && Header}
        {children}
      </StyledViewContainer>
    )
  },
)

ViewContainer.displayName = 'ViewContainer'
