import { View, type ViewProps, styled } from 'tamagui'

import { useAnimatedEntry } from '@/shared/hooks/useAnimatedEntry'
import { DelayMS } from 'shared/constants'

import { MOUNT_STYLE } from '@/shared/constants/animations'

interface Props extends ViewProps {
  delay?: number
  variant?: 'falldown' | 'float' | 'fade'
}

export const Delay = View.styleable<Props>(
  (
    {
      delay = DelayMS.ANIMATION.MEDIUM[0],
      variant = 'fade',
      children,
      ...props
    },
    ref,
  ) => {
    const { isVisible, item } = useAnimatedEntry({ delay, item: children })
    return (
      <StyledAnimateMount
        key={`${isVisible}-${delay}`}
        ref={ref}
        opacity={isVisible ? 1 : 0}
        variant={variant}
        {...props}
      >
        {item}
      </StyledAnimateMount>
    )
  },
)

const StyledAnimateMount = styled(View, {
  animation: 'lazy',
  enterStyle: MOUNT_STYLE,
  opacity: 1,
  y: 0,

  variants: {
    variant: {
      fade: {
        enterStyle: {
          opacity: 0,
        },
        exitStyle: {
          opacity: 0,
        },
      },
      falldown: {
        enterStyle: {
          opacity: 0,
          y: -80,
        },
        exitStyle: {
          opacity: 0,
          y: -80,
        },
      },
      float: {
        enterStyle: {
          opacity: 0,
          y: 80,
        },
        exitStyle: {
          opacity: 0,
          y: 80,
        },
      },
    },
  } as const,
})

Delay.displayName = 'DelayComponent'
