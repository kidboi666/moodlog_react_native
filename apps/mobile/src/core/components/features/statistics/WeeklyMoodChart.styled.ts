import { Text, XStack, YStack, styled } from 'tamagui'

export const YStackContainer = styled(YStack, {
  flex: 1,
  rounded: '$8',
  bg: '$color4',
  p: '$4',
  gap: '$3',
})

export const ChartBox = styled(XStack, {
  flex: 1,
})

export const AnimatedBox = styled(XStack, {
  gap: '$4',
  height: '$2',
})

export const AnimatedText = styled(Text, {
  fontWeight: '700',
  color: '$color10',
})
