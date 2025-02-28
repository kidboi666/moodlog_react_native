import { Button, ScrollView, XStack, YStack } from 'tamagui';
import { useDate } from '@/store/hooks/useDate';
import { useJournal } from '@/store/hooks/useJournal';
import { GardenTitleHeader } from '@/components/features/garden/GardenTitleHeader';
import { GardenDayUnits } from '@/components/features/garden/GardenDayUnits';
import { GardenMonthUnits } from '@/components/features/garden/GardenMonthUnits';
import { Garden } from '@/components/features/garden/Garden';
import { getMonthInISODateString } from '@/utils/common';
import { useGarden } from '@/store/hooks/useGarden';
import { memo } from 'react';

const MemoizedGarden = memo(Garden);

export const GardenSection = () => {
  const { selectedYear, selectedMonth } = useDate();
  const { getEmotionForDate } = useJournal();
  const { months, onMonthChange } = useGarden();

  return (
    <YStack bg="$gray5" p="$4" rounded="$8" gap="$4">
      <GardenTitleHeader />
      <ScrollView horizontal>
        <GardenDayUnits />
        <XStack gap="$2">
          {months.map(({ monthKey, lastDate, firstDateDay, weekLength }, i) => {
            const isSelected =
              selectedMonth === getMonthInISODateString(selectedYear, monthKey);

            return (
              <Button
                key={i}
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
                  <MemoizedGarden
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
          })}
        </XStack>
      </ScrollView>
    </YStack>
  );
};
