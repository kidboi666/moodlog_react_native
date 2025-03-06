import { MonthKey } from '@/types/utils';
import { Button, YStack } from 'tamagui';
import { GardenMonthUnits } from '@/screens/garden/GardenMonthUnits';
import { Garden } from '@/screens/garden/Garden';
import { memo } from 'react';
import { Emotion } from '@/types/entries';

interface Props {
  monthData: {
    monthKey: MonthKey;
    lastDate: number;
    firstDateDay: number;
    weekLength: number;
  };
  isSelected: boolean;
  onMonthChange: (monthKey: MonthKey) => void;
  selectedYear: number;
  getEmotionForDate: (year: number, month: number, date: number) => Emotion[];
}

export const MonthItem = memo(
  ({
    monthData,
    isSelected,
    onMonthChange,
    selectedYear,
    getEmotionForDate,
  }: Props) => {
    const { monthKey, lastDate, firstDateDay, weekLength } = monthData;
    return (
      <Button
        key={monthKey}
        unstyled
        animation="medium"
        animateOnly={['transform', 'opacity']}
        rounded="$8"
        py="$4"
        scale={isSelected ? 1.14 : 1}
        opacity={isSelected ? 1 : 0.7}
        z={isSelected ? 100 : 1}
        onPress={() => onMonthChange(monthKey)}
      >
        <YStack>
          <GardenMonthUnits month={monthKey} isSelected={isSelected} />
          <Garden
            weekLength={weekLength}
            monthKey={monthKey}
            firstDateDay={firstDateDay}
            selectedYear={selectedYear}
            lastDate={lastDate}
            getEmotionForDate={getEmotionForDate}
          />
        </YStack>
      </Button>
    );
  },
);
