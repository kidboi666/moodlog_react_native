import { memo } from 'react';
import { YStack } from 'tamagui';

import { Garden } from '@/core/components/features/entries/Garden';
import { GardenMonthUnits } from '@/core/components/features/entries/GardenMonthUnits';

import { ISODateString, ISOMonthString, MonthKey } from '@/types/date.types';
import { Mood } from '@/types/mood.types';

interface Props {
  monthKey: MonthKey;
  isSelected: boolean;
  weekLength: number;
  firstDateDay: number;
  monthDate: ISOMonthString;
  lastDate: number;
  getMoodForDate: (date: ISODateString) => Mood[];
}
export const MonthItemContent = memo(
  ({
    monthKey,
    isSelected,
    weekLength,
    firstDateDay,
    monthDate,
    lastDate,
    getMoodForDate,
  }: Props) => {
    return (
      <YStack>
        <GardenMonthUnits month={monthKey} isSelected={isSelected} />
        <Garden
          weekLength={weekLength}
          firstDateDay={firstDateDay}
          monthDate={monthDate}
          lastDate={lastDate}
          getMoodForDate={getMoodForDate}
        />
      </YStack>
    );
  },
);
