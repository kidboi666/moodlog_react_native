import { styled, Text as TamaguiText } from 'tamagui';

export const Text = styled(TamaguiText, {
  name: 'ThemedText',
  color: '$text',
  fontFamily: '$body',
});
