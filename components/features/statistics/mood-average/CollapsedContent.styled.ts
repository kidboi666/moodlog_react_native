import { Button, View, XStack, YStack, styled } from 'tamagui'

import { BaseText } from '@/components/shared/BaseText'
import { H2, H3 } from '@/components/shared/Heading'

export const ViewContainer = styled(View, {
  animation: 'quick',
  animateOnly: ['opacity'],
  justify: 'space-between',
  flex: 1,
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
})

export const YStackContainer = styled(YStack, {
  gap: '$2',
})

export const CardTitle = styled(H3, {
  color: '$gray12',

  variants: {
    signatureMood: {
      true: {
        color: '$gray1',
      },
    },
  } as const,
})

export const CardDescription = styled(BaseText, {
  color: '$gray12',

  variants: {
    signatureMood: {
      true: {
        color: '$gray1',
      },
    },
  } as const,
})

export const MoodText = styled(H2, {
  color: '$gray12',
  flex: 1,

  variants: {
    signatureMood: {
      true: {
        color: '$gray1',
      },
    },
  } as const,
})

export const MaximizeButton = styled(Button, {
  unstyled: true,
  scaleIcon: 1.5,
  self: 'flex-end',
  color: '$gray1',
  opacity: 0.4,
})

export const EmptyContainer = styled(View, {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  padding: '$4',
})

export const TitleBox = styled(YStack, {
  gap: '$2',
})

export const MoodBox = styled(XStack, {
  alignItems: 'center',
  justify: 'flex-start',
  gap: '$2',
  marginTop: '$4',
})
