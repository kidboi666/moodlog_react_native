import { XStack, YStack, styled } from 'tamagui'

import { PressableButton } from '@/components/shared/PressableButton.styled'

export const SignInButton = styled(PressableButton, {
  themeInverse: true,
})

export const SignUpSection = styled(XStack, {
  items: 'center',
  justify: 'center',
  gap: '$2',
})

export const SignUpButton = styled(PressableButton, {
  bg: 'transparent',
  color: '$blue10',
})

export const SignInSection = styled(YStack, {
  gap: '$4',
})
