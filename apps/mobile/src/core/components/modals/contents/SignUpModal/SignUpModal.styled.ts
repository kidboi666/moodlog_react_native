import { PressableButton } from '@/core/components/shared/PressableButton.styled'
import { XStack, YStack, styled } from 'tamagui'

export const SignUpButton = styled(PressableButton, {
  themeInverse: true,
})

export const SignUpSection = styled(YStack, {
  gap: '$4',
})

export const SignInButton = styled(PressableButton, {
  bg: 'transparent',
  color: '$blue10',
})

export const SignInSection = styled(XStack, {
  items: 'center',
  justify: 'center',
  gap: '$2',
})
