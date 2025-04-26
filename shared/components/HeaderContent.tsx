import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, XStack, XStackProps, styled } from 'tamagui'

import {
  CONTAINER_HORIZONTAL_PADDING,
  CONTAINER_VERTICAL_PADDING,
} from 'shared/constants'

import { PressableButton } from './PressableButton'

export const StyledHeaderContent = styled(XStack, {
  py: CONTAINER_VERTICAL_PADDING,
  justify: 'space-between',
  items: 'center',

  variants: {
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

interface Props extends XStackProps {
  edges?: Array<'top' | 'bottom'>
  leftAction?: () => void
  leftActionIcon?: any
  rightActionIcon?: any
  rightAction?: () => void
  rightActionDisabled?: boolean
}

const StyledHeaderContainer = StyledHeaderContent.styleable<Props>(
  (
    {
      children,
      edges = ['top'],
      leftAction,
      leftActionIcon = ArrowLeft,
      rightAction,
      rightActionIcon = ArrowRight,
      rightActionDisabled = false,
      ...props
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets()

    return (
      <StyledHeaderContent
        ref={ref}
        topEdge={edges?.includes('top') ? insets.top : 0}
        bottomEdge={edges?.includes('bottom') ? insets.bottom : 0}
        {...props}
      >
        {leftAction && (
          <PressableButton
            icon={leftActionIcon ?? ArrowLeft}
            onPress={leftAction}
          />
        )}
        {rightAction && (
          <>
            <View flex={1} />
            <PressableButton
              icon={rightActionIcon ?? ArrowRight}
              onPress={rightAction}
              disabled={rightActionDisabled}
            />
          </>
        )}
      </StyledHeaderContent>
    )
  },
)

export const HeaderContent = memo(StyledHeaderContainer)

HeaderContent.displayName = 'HeaderContent'
