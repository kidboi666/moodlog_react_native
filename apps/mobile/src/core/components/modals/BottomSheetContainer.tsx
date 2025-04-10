import type { PropsWithChildren } from 'react'
import type { ViewProps } from 'tamagui'
import * as S from './BottomSheetContainer.styled'

export const BottomSheetContainer = S.BottomSheetContainer.styleable<
  PropsWithChildren<ViewProps>
>(({ children, ...props }, ref) => {
  return (
    <S.BottomSheetContainer ref={ref} {...props}>
      {children}
    </S.BottomSheetContainer>
  )
})

BottomSheetContainer.displayName = 'BottomSheetContainer'
