import type { PropsWithChildren } from 'react'
import { View, ViewProps, styled } from 'tamagui'

const StyledBottomSheetContainer = styled(View, {
  flex: 1,
  gap: '$4',
  p: '$5',
})

export const BottomSheetContainer = StyledBottomSheetContainer.styleable<
  PropsWithChildren<ViewProps>
>(({ children, ...props }, ref) => {
  return (
    <StyledBottomSheetContainer ref={ref} {...props}>
      {children}
    </StyledBottomSheetContainer>
  )
})

BottomSheetContainer.displayName = 'BottomSheetContainer'
