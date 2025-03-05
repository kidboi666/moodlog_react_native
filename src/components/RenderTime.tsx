import { Text, TextProps } from 'tamagui';

interface Props extends TextProps {
  createdAt: string;
}

export const DateTime = ({ createdAt, ...props }: Props) => {
  const date = new Date(createdAt);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const timestamp = `${hours}: ${minutes}`;
  return <Text {...props}>{timestamp}</Text>;
};
