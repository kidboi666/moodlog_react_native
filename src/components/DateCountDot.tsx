import { View, XStack } from 'tamagui';

export const DateCountDot = ({ dateCounts, dateString, isSelected }) => {
  return (
    <XStack gap={2} position="absolute" b="$1">
      {Array.from({ length: dateCounts[dateString] }, (_, i) => {
        if (i > 2) return null;
        return (
          <View
            key={i}
            width="$0.5"
            height="$0.5"
            bg={isSelected ? '$gray12' : '$gray1'}
            rounded="$1"
            b={-8}
          />
        );
      })}
    </XStack>
  );
};
