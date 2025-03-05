import { XStack, YStack } from 'tamagui';
import { Grass } from '@/screens/garden/Grass';
import { getMonthNumber } from '@/utils/common';
import { Emotion } from '@/types/entries';
import { MonthKey } from '@/types/utils';
import { memo, useMemo } from 'react';

interface Props {
  weekLength: number;
  monthKey: MonthKey;
  firstDateDay: number;
  selectedYear: number;
  lastDate: number;
  getEmotionForDate: (year: number, month: number, date: number) => Emotion[];
}

export const Garden = memo(
  ({
    weekLength,
    monthKey,
    firstDateDay,
    selectedYear,
    lastDate,
    getEmotionForDate,
  }: Props) => {
    const emotionsData = useMemo(() => {
      const data = [];
      for (let week = 0; week < weekLength; week++) {
        const weekData = [];
        for (let day = 0; day < 7; day++) {
          const dateNum = week * 7 + day - firstDateDay + 1;
          if (dateNum <= 0 || dateNum > lastDate) {
            weekData.push(null);
          } else {
            weekData.push(
              getEmotionForDate(
                selectedYear,
                getMonthNumber(monthKey),
                dateNum,
              ),
            );
          }
        }
        data.push(weekData);
      }
      return data;
    }, [
      weekLength,
      monthKey,
      firstDateDay,
      selectedYear,
      lastDate,
      getEmotionForDate,
    ]);

    return (
      <XStack gap="$2">
        {emotionsData.map((week, weekIndex) => (
          <YStack key={weekIndex} gap="$2">
            {week.map((emotions, dayIndex) => (
              <Grass
                key={dayIndex}
                emotions={emotions}
                isEmpty={emotions === null}
              />
            ))}
          </YStack>
        ))}
      </XStack>
    );
  },
);
