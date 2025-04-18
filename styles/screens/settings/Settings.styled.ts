import { Button, YStack, styled } from 'tamagui'

import { BaseText } from '@/components/shared/BaseText'
import { PressableButton } from '@/components/shared/PressableButton.styled'
import { ViewContainer as HOSContainer } from '@/components/shared/ViewContainer.styleable'

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

export const SignInText = styled(BaseText, {
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
