import {
  Image as TamaguiImage,
  styled,
  TextArea as TamaguiTextArea,
  YStack,
} from 'tamagui';

export const InputContainer = styled(YStack, {
  flex: 1,
  gap: '$2',
  position: 'relative',
});

export const TextArea = styled(TamaguiTextArea, {
  color: '$gray12',
  fontSize: '$6',
  numberOfLines: 17,
  flex: 1,
  text: 'left',
  verticalAlign: 'top',
  placeholderTextColor: '$gray7',
});

export const Image = styled(TamaguiImage, {
  width: 200,
  height: 200,
  mx: 'auto',
  rounded: 12,
  shadowColor: 'black',
  shadowOpacity: 0.5,
  shadowRadius: 10,
});
