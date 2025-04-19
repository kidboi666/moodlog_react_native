import { XStack, YStack, styled } from 'tamagui'

import { PressableButton } from '@/components/shared/PressableButton'

export const SignUpSection = styled(XStack, {
  items: 'center',
  justify: 'center',
  gap: '$2',
})

export const SignUpButton = styled(PressableButton, {
  bg: 'transparent',
  color: '$blue1',
})

export const SignInSection = styled(YStack, {
  gap: '$4',
})
