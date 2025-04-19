import { memo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { XStackProps } from 'tamagui'

import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import * as S from './HeaderContainer.styled'
import { PressableButton } from './PressableButton'

interface Props extends XStackProps {
  edges?: Array<'top' | 'bottom'>
  leftAction?: () => void
  rightAction?: () => void
}

const StyledHeaderContainer = S.HeaderContainer.styleable<Props>(
  ({ children, edges = ['top'], leftAction, rightAction, ...props }, ref) => {
    const insets = useSafeAreaInsets()

    return (
      <S.HeaderContainer
        ref={ref}
        topEdge={edges?.includes('top') ? insets.top : 0}
        bottomEdge={edges?.includes('bottom') ? insets.bottom : 0}
        {...props}
      >
        {leftAction && (
          <PressableButton icon={ArrowLeft} onPress={leftAction} />
        )}
        {children}
        {rightAction && (
          <PressableButton icon={ArrowRight} onPress={rightAction} />
        )}
      </S.HeaderContainer>
    )
  },
)

export const HeaderContainer = memo(StyledHeaderContainer)

HeaderContainer.displayName = 'HeaderContainer'
