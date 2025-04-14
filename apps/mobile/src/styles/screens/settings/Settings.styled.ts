import { Button, Text, YStack, styled } from 'tamagui'

import { PressableButton } from '@/core/components/shared/PressableButton.styled'
import { ViewContainer as HOSContainer } from '@/core/components/shared/ViewContainer.styleable'
export const ViewContainer = styled(HOSContainer, {
  edges: ['top'],
  padded: true,
  gap: '$4',
})

export const ItemContainer = styled(YStack, {
  gap: '$6',
})

export const SignInButton = styled(Button, {
  animation: 'quick',
  justify: 'flex-start',
  bg: '$color4',
  size: '$5',
  fontSize: '$6',
})

export const SignInText = styled(Text, {
  fontSize: '$5',
  flex: 1,
})

export const CopyrightContainer = styled(YStack, {
  items: 'center',
  mt: '$4',
})

export const LogoutButton = styled(PressableButton, {
  bg: 'transparent',
  color: '$red10',
})
