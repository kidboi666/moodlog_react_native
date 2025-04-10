import { View, XStack, styled } from 'tamagui'

import { BottomSheetContainer as HOSBottomSheetContainer } from '@/core/components/modals/BottomSheetContainer'

export const BottomSheetContainer = styled(HOSBottomSheetContainer, {
  pl: 0,
})

export const XStackContainer = styled(XStack, {
  flex: 1,
  gap: '$3',
})

const MoodBarBase = styled(View, {
  width: '3%',
  borderTopRightRadius: '$4',
  borderBottomRightRadius: '$4',
})

export const ColoredMoodBar = styled(MoodBarBase, {
  variants: {
    moodColor: {
      ':string': bg => {
        return { bg }
      },
    },
  },
})

export const UncoloredMoodBar = styled(MoodBarBase, {
  bg: '$gray8',
})

export const ButtonsViewBox = styled(View, {
  items: 'flex-end',
})
