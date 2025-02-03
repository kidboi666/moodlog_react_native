import { StyledText } from '@/components/common/Text.styled';
import { GetProps } from '@tamagui/core';

type Props = GetProps<typeof StyledText>;

export const Text = ({ variant = 'primary', ...props }: Props) => {
  return <StyledText variant={variant} {...props} />;
};

Text.displayName = 'ThemedText';
