import { Progress as TamaguiProgress, XStack, YStack, styled } from 'tamagui'

import { BaseText } from '@/core/components/shared/BaseText'

export const GraphContainer = styled(YStack, {
  gap: '$2',
})

export const GraphNameBox = styled(XStack, {
  justify: 'space-between',
  items: 'flex-end',
})

export const GraphName = styled(BaseText, {
  color: '$gray9',
})

export const Progress = styled(TamaguiProgress, {
  size: '$1',
  height: 20,
})

export const ProgressIndicator = styled(TamaguiProgress.Indicator, {
  animation: 'bouncy',

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg }
      },
    },
  },
})
