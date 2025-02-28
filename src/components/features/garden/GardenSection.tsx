import { Button, ScrollView, XStack, YStack } from 'tamagui';
import { useDate } from '@/store/hooks/useDate';
import { useJournal } from '@/store/hooks/useJournal';
import { GardenTitleHeader } from '@/components/features/garden/GardenTitleHeader';
import { GardenDayUnits } from '@/components/features/garden/GardenDayUnits';
import { GardenMonthUnits } from '@/components/features/garden/GardenMonthUnits';
import { Garden } from '@/components/features/garden/Garden';
import { getMonthNumber } from '@/utils/common';
import Animated from 'react-native-reanimated';
import { useGarden } from '@/store/hooks/useGarden';
import { memo } from 'react';

const AnimatedGarden = Animated.createAnimatedComponent(Button);
const MemoizedGarden = memo(Garden);

export const GardenSection = () => {
  const { selectedYear, selectedMonth } = useDate();
  const { getDateCountsForDate } = useJournal();
  const { months, onMonthChange } = useGarden();

  return (
    <YStack bg="$gray5" p="$4" rounded="$8" gap="$4" mb="$4">
      <GardenTitleHeader />
      <ScrollView horizontal>
        <GardenDayUnits />
        <XStack gap="$2">
          {months.map(
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
                  onPress={() => onMonthChange(monthString)}
                  bg={isSelected ? '$gray7' : 'transparent'}
                >
                  <YStack>
                    <GardenMonthUnits
                      month={monthString}
                      isSelected={isSelected}
                    />
                    <MemoizedGarden
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
