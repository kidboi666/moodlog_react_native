import { View, styled } from 'tamagui'

import { PressableButton } from '@/core/components/shared/PressableButton.styled'

export const BackButton = styled(PressableButton, {
  elevate: false,
  bg: '$backgroundTransparent',
})

export const RestBox = styled(View, {
  flex: 1,
})
