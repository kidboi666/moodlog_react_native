import { View, type ViewProps, styled } from 'tamagui'

import { ANIMATION_DELAY_MS } from '@/constants'
import { useAnimatedEntry } from '@/hooks/useAnimatedEntry'

import { MOUNT_STYLE } from '@/constants/animations'

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

interface Props extends ViewProps {
  delay?: number
  variant?: 'falldown' | 'float' | 'fade'
}

export const AnimatedEntry = StyledAnimateMount.styleable<Props>(
  (
    { delay = ANIMATION_DELAY_MS[0], variant = 'fade', children, ...props },
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

AnimatedEntry.displayName = 'AnimateMount'
