import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { XStack, XStackProps, styled } from 'tamagui'

import { Layout } from '@/constants'
import { PressableButton } from './PressableButton'

interface Props extends XStackProps {
  edges?: Array<'top' | 'bottom'>
  leftAction?: () => void
  leftActionIcon?: any
  rightActionIcon?: any
  rightAction?: () => void
  rightActionDisabled?: boolean
}

export const HeaderContent = XStack.styleable<Props>(
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
        {children}
        {rightAction && (
          <PressableButton
            self='flex-end'
            icon={rightActionIcon ?? ArrowRight}
            onPress={rightAction}
            disabled={rightActionDisabled}
          />
        )}
      </StyledHeaderContent>
    )
  },
)

const StyledHeaderContent = styled(XStack, {
  py: Layout.SPACE.CONTAINER_VERTICAL_PADDING,
  px: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
  justify: 'space-between',
  width: '100%',
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

HeaderContent.displayName = 'HeaderContent'
