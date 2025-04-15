import { View, XStack, styled } from 'tamagui'

import { ViewContainer as HOSViewContainer } from '@/core/components/shared/ViewContainer.styleable'

export const ViewContainer = styled(HOSViewContainer, {
  pl: 0,
})

export const XStackContainer = styled(XStack, {
  flex: 1,
  gap: '$3',
})

export const InputContainer = styled(XStack, {
  flex: 1,
  gap: '$4',
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
