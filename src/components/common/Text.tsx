import { GetProps, TextProps } from 'tamagui';
import * as S from './Text.styled';

type Props = GetProps<typeof S.Text> & TextProps;

export const Text = ({ ...props }: Props) => {
  return <S.Text {...props} />;
};
