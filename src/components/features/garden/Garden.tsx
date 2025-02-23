import { XStack, YStack } from 'tamagui';
import { Grass } from '@/components/features/garden/Grass';
import { getMonthNumber } from '@/utils/common';

export const Garden = ({
  weekLength,
  monthString,
  firstDateDay,
  selectedYear,
  lastDate,
  getDateCountsForDate,
}) => {
  return (
    <XStack gap="$2">
      {Array.from({ length: weekLength }, (_, week) => (
        <YStack key={week} gap="$2">
          {Array.from({ length: 7 }, (_, day) => {
            const dateNum = week * 7 + day - firstDateDay + 1;
            const journalsCount = getDateCountsForDate(
              selectedYear,
              getMonthNumber(monthString),
              dateNum,
            );
            if (dateNum <= 0 || dateNum > lastDate) {
              return <Grass key={day} isEmpty />;
            }

            return <Grass key={day} count={journalsCount} />;
          })}
        </YStack>
      ))}
    </XStack>
  );
};
