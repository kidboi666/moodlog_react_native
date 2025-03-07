import { TextProps } from 'tamagui';
import * as S from './RenderDate.styled';

interface Props extends TextProps {
  createdAt: string;
}

export const RenderTime = ({ createdAt, ...props }: Props) => {
  const date = new Date(createdAt);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const timestamp = `${hours}: ${minutes}`;
  return <S.Text {...props}>{timestamp}</S.Text>;
};
