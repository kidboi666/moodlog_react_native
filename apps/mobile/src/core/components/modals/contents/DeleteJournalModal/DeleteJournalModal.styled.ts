import { YStack, styled } from 'tamagui'

import { BottomSheetContainer as HOSBottomSheetContainer } from '@/core/components/modals/BottomSheetContainer'
import { BaseText } from '@/core/components/shared/BaseText'
import { H3 } from '@/core/components/shared/Heading'
import { PressableButton } from '@/core/components/shared/PressableButton'

export const BottomSheetContainer = styled(HOSBottomSheetContainer)

export const ModalTitle = styled(H3, {
  text: 'center',
})

export const ModalDescription = styled(BaseText, {
  color: '$gray11',
})

export const ModalContentYStack = styled(YStack, {
  gap: '$3',
  mt: '$2',
})

export const ConfirmButton = styled(PressableButton, {
  bg: '$red9',
})

export const CancelButton = styled(PressableButton, {
  fontWeight: '800',
  elevate: false,
})
