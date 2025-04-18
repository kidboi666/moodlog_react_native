import { Image as TamaguiImage, View, XStack, YStack, styled } from 'tamagui'

import { H3 } from '@/components/shared/Heading'
import { ViewContainer as HOSContainer } from '@/components/shared/ViewContainer.styleable'

import { BaseText } from '@/components/shared/BaseText'
import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/styles/animations'

export const ViewContainer = styled(HOSContainer, {
  px: 0,
  gap: '$6',
})

export const MoodBar = styled(View, {
  width: '3%',
  animation: 'medium',
  animateOnly: ['transform'],
  enterStyle: { x: -20 },
  borderTopRightRadius: '$4',
  borderBottomRightRadius: '$4',

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg }
      },
    },
  },
})

export const ContentBox = styled(YStack, {
  flex: 1,
  gap: '$4',
})

export const MoodTextBox = styled(XStack, {
  gap: '$2',
  self: 'flex-start',
  ml: '$3',
  justify: 'center',
  animation: 'bouncy',
  animateOnly: MOUNT_STYLE_KEY,
  enterStyle: MOUNT_STYLE,
})

export const MoodLevelText = styled(H3, {
  color: '$gray11',
})

export const MoodTypeText = styled(H3)

export const ImageBox = styled(XStack, {
  animation: 'bouncy',

  enterStyle: MOUNT_STYLE,
  elevation: '$2',
})

export const Image = styled(TamaguiImage, {
  width: 300,
  height: 300,
  rounded: '$8',
  ml: '$4',
})

export const ContentText = styled(BaseText, {
  ml: '$3',
  pr: '$4',

  variants: {
    fontSize: {
      ':string': fontSize => {
        return { fontSize }
      },
    },
  },
})
