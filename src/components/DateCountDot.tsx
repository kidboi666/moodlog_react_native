import { View, XStack } from 'tamagui';
import { IDateCounts } from '@/types/entries';

interface Props {
  dateCounts?: IDateCounts;
  dateString: string;
  isSelected?: boolean;
  variant?: 'default' | 'contained';
}

export const DateCountDot = ({
  dateCounts,
  dateString,
  isSelected,
  variant = 'default',
}: Props) => {
  if (!dateCounts) return null;
  return (
    <XStack gap={2} position="absolute" b="$1">
      {Array.from({ length: dateCounts[dateString] }, (_, i) => {
        if (i >= 3) return null;
        return (
          <View
            key={i}
            width="$0.5"
            height="$0.5"
            b={-8}
            rounded="$1"
            bg={
              variant === 'contained'
                ? isSelected
                  ? '$gray6'
                  : '$gray12'
                : isSelected
                  ? '$gray12'
                  : '$gray6'
            }
          />
        );
      })}
    </XStack>
  );
};
