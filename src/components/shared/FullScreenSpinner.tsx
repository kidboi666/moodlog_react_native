import { memo } from 'react'
import { Spinner, Stack, styled } from 'tamagui'

import { useUI } from '@/store'

type SpinnerSize = 'small' | 'large'

interface FullScreenSpinnerProps {
  size?: SpinnerSize
}

export const FullScreenSpinner = memo(
  ({ size = 'small' }: FullScreenSpinnerProps) => {
    const isNavigating = useUI(state => state.isNavigating)
    const isLoading = useUI(state => state.isLoading)

    const shouldShow = isNavigating || isLoading

    if (!shouldShow) return null

    return (
      <StyledOverlay>
        <Spinner size={size} />
      </StyledOverlay>
    )
  },
)

const StyledOverlay = styled(Stack, {
  flex: 1,
  position: 'absolute',
  t: 0,
  l: 0,
  r: 0,
  b: 0,
  z: 100_000_000,
  items: 'center',
  justify: 'center',
  bg: '$color4',
  opacity: 0.5,
})
