import { Button, ScrollView, XStack, YStack } from 'tamagui';
import { MONTHS } from '@/constants/date';
import { useDate } from '@/store/hooks/useDate';
import { useJournal } from '@/store/hooks/useJournal';
import { useMemo } from 'react';
import { ISOMonthString } from '@/types/dtos/date';
import { GardenTitleHeader } from '@/components/features/garden/GardenTitleHeader';
import { GardenDayUnits } from '@/components/features/garden/GardenDayUnits';
import { GardenMonthUnits } from '@/components/features/garden/GardenMonthUnits';
import { Garden } from '@/components/features/garden/Garden';
import {
  getFirstDateDay,
  getLastDate,
  getMonthNumber,
  getWeekLength,
} from '@/utils/common';
import Animated from 'react-native-reanimated';

const AnimatedGarden = Animated.createAnimatedComponent(Button);

export const GardenSection = () => {
  const { selectedYear, selectedMonth, onSelectedMonthChange } = useDate();
  const { getDateCountsForDate, getJournalsByMonth, getJournalsByDate } =
    useJournal();

  const monthsData = useMemo(
    () =>
      Object.keys(MONTHS).map(month => ({
        monthString: month,
        lastDate: getLastDate(selectedYear, month),
        firstDateDay: getFirstDateDay(selectedYear, month),
        weekLength: getWeekLength(selectedYear, month),
      })),
    [selectedYear],
  );

  const handleClick = (monthString: string) => {
    onSelectedMonthChange(getMonthNumber(monthString));
    const prefix =
      `${selectedYear}-${(getMonthNumber(monthString) + 1).toString().padStart(2, '0')}` as ISOMonthString;
    getJournalsByMonth(prefix);
  };

  return (
    <YStack bg="$gray5" p="$4" rounded="$8" gap="$4" mb="$4">
      <GardenTitleHeader />
      <ScrollView horizontal>
        <GardenDayUnits />
        <XStack gap="$2">
          {monthsData.map(
            ({ monthString, lastDate, firstDateDay, weekLength }, i) => {
              const isSelected = selectedMonth === getMonthNumber(monthString);

              return (
                <AnimatedGarden
                  key={i}
                  unstyled
                  animation="medium"
                  animateOnly={['backgroundColor']}
                  rounded="$4"
                  py="$4"
                  onPress={() => handleClick(monthString)}
                  bg={isSelected ? '$gray7' : 'transparent'}
                >
                  <YStack>
                    <GardenMonthUnits
                      month={monthString}
                      isSelected={isSelected}
                    />
                    <Garden
                      weekLength={weekLength}
                      monthString={monthString}
                      firstDateDay={firstDateDay}
                      selectedYear={selectedYear}
                      lastDate={lastDate}
                      getDateCountsForDate={getDateCountsForDate}
                    />
                  </YStack>
                </AnimatedGarden>
              );
            },
          )}
        </XStack>
      </ScrollView>
    </YStack>
  );
};
