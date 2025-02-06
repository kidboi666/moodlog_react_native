import { GetProps, styled, Text as TamaguiText, TextProps } from 'tamagui';

const StyledText = styled(TamaguiText, {
  name: 'ThemedText',
  color: '$textPrimary',
  fontFamily: '$body',
});

type Props = GetProps<typeof StyledText> & TextProps;

export const Text = ({ ...props }: Props) => {
  return <StyledText {...props} />;
};
