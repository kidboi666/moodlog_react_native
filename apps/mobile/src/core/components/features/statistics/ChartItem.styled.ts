import { Text, View, XStack, styled } from 'tamagui'

export const ChartItemContainer = styled(XStack, {
  flex: 1,
  gap: '$2',
})

export const ChartItem = styled(View, {
  height: '$1',
  rounded: '$4',
  width: '100%',

  variants: {
    moodColor: {
      ':string': bg => {
        return {
          bg,
        }
      },
    },
  } as const,
})

export const PercentageText = styled(Text, {
  fontSize: '$1',
  color: '$color10',
  mt: '$1',
})
