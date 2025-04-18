import { Separator as TamaguiSeparator, XStack, YStack, styled } from 'tamagui'

import { H1, H4 } from '@/components/shared/Heading'

export const ContentHeaderContainer = styled(YStack, {
  gap: '$4',
})

export const WelcomeEmojiBox = styled(XStack, {
  gap: '$2',
  items: 'flex-end',
})

export const WelcomeTitleText = styled(H1, {})

export const HowAreYouText = styled(H4, {
  color: '$gray11',
})

export const Separator = styled(TamaguiSeparator, {
  borderColor: 'transparent',
  mb: '$4',
})
