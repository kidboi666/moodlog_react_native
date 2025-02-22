import { View } from 'tamagui';

interface Props {
  count?: number;
  isEmpty?: boolean;
}

export const CommitBox = ({ count, isEmpty = false }: Props) => {
  if (isEmpty) {
    return <View width={16} height={16} />;
  }
  return (
    <View
      bg={count ? '$green11' : '$gray10'}
      width={16}
      height={16}
      rounded="$1"
    />
  );
};
