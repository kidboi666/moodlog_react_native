import { memo } from 'react'
import { View, type ViewProps, styled } from 'tamagui'

import { ANIMATION_DELAY_MS } from '@/constants'
import { useFadeIn } from '@/hooks/useFadeIn'

import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/styles/animations'

const FadeInContainer = styled(View, {
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

const StyledFadeIn = FadeInContainer.styleable<Props>(
  ({ delay = ANIMATION_DELAY_MS[0], children, ...props }, ref) => {
    const { isVisible, item } = useFadeIn({ delay, item: children })

    return (
      <FadeInContainer ref={ref} isVisible={isVisible} {...props}>
        {item}
      </FadeInContainer>
    )
  },
)

export const FadeIn = memo(StyledFadeIn)

FadeIn.displayName = 'FadeIn'
