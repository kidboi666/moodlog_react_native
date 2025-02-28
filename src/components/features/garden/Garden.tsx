import { XStack, YStack } from 'tamagui';
import { Grass } from '@/components/features/garden/Grass';
import { getMonthNumber } from '@/utils/common';
import { Emotion } from '@/types/entries';
import { MonthKey } from '@/types/utils';

interface Props {
  weekLength: number;
  monthKey: MonthKey;
  firstDateDay: number;
  selectedYear: number;
  lastDate: number;
  getEmotionForDate: (year: number, month: number, date: number) => Emotion[];
}

export const Garden = ({
  weekLength,
  monthKey,
  firstDateDay,
  selectedYear,
  lastDate,
  getEmotionForDate,
}: Props) => {
  return (
    <XStack gap="$2">
      {Array.from({ length: weekLength }, (_, week) => (
        <YStack key={week} gap="$2">
          {Array.from({ length: 7 }, (_, day) => {
            const dateNum = week * 7 + day - firstDateDay + 1;
            const emotions = getEmotionForDate(
              selectedYear,
              getMonthNumber(monthKey),
              dateNum,
            );

            if (dateNum <= 0 || dateNum > lastDate) {
              return <Grass key={day} isEmpty />;
            }

            return <Grass key={day} emotions={emotions} />;
          })}
        </YStack>
      ))}
    </XStack>
  );
};
