import { memo } from 'react'
import { Spinner } from 'tamagui'

import { useUI } from '@/store'

import * as S from './FullScreenSpinner.styled'

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
      <S.Overlay>
        <Spinner size={size} />
      </S.Overlay>
    )
  },
)
