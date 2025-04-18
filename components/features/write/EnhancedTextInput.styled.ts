import {
  Image as TamaguiImage,
  TextArea as TamaguiTextArea,
  XStack,
  YStack,
  styled,
} from 'tamagui'

export const InputContainer = styled(YStack, {
  flex: 1,
  gap: '$4',
})

export const TextArea = styled(TamaguiTextArea, {
  color: '$gray12',
  fontSize: '$6',
  numberOfLines: 17,
  flex: 1,
  text: 'left',
  verticalAlign: 'top',
  placeholderTextColor: '$gray7',
})

export const ImageContainer = styled(XStack, {
  justify: 'flex-start',
})

export const Image = styled(TamaguiImage, {
  width: 80,
  height: 80,
  rounded: 12,
  mr: '$4',
  shadowColor: 'black',
  shadowOpacity: 0.5,
  shadowRadius: 10,
})
