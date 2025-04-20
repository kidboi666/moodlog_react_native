import { View, type ViewProps, styled } from 'tamagui'

import { ANIMATION_DELAY_MS } from '@/constants'
import { useFadeIn } from '@/hooks/useFadeIn'

import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/constants/animations'

const StyledFadeIn = styled(View, {
  animation: 'lazy',
  animateOnly: MOUNT_STYLE_KEY,
  enterStyle: MOUNT_STYLE,

  variants: {
    isVisible: {
      false: {
        opacity: 0,
      },
    },
  } as const,
})

interface Props extends ViewProps {
  delay?: number
}

export const FadeIn = StyledFadeIn.styleable<Props>(
  ({ delay = ANIMATION_DELAY_MS[0], children, ...props }, ref) => {
    const { isVisible, item } = useFadeIn({ delay, item: children })

    return (
      <StyledFadeIn ref={ref} isVisible={isVisible} {...props}>
        {item}
      </StyledFadeIn>
    )
  },
)

FadeIn.displayName = 'FadeIn'
