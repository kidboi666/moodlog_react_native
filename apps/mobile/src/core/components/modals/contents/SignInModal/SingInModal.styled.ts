import { PressableButton } from '@/core/components/shared/PressableButton.styled'
import { XStack, YStack, styled } from 'tamagui'

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
