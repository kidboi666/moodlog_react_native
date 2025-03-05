import { Button, ScrollView, XStack, YStack } from 'tamagui';
import { useDate } from '@/store/hooks/useDate';
import { useJournal } from '@/store/hooks/useJournal';
import { GardenTitleHeader } from '@/components/features/garden/GardenTitleHeader';
import { GardenDayUnits } from '@/components/features/garden/GardenDayUnits';
import { GardenMonthUnits } from '@/components/features/garden/GardenMonthUnits';
import { Garden } from '@/components/features/garden/Garden';
import { getMonthInISODateString } from '@/utils/common';
import { useGarden } from '@/store/hooks/useGarden';
import { useCallback, useMemo } from 'react';

export const GardenSection = () => {
  const { selectedYear, selectedMonth } = useDate();
  const { getEmotionForDate } = useJournal();
  const { months, onMonthChange } = useGarden();

  // 함수 메모이제이션
  const memoizedGetEmotionForDate = useCallback(getEmotionForDate, [
    getEmotionForDate,
  ]);

  // 현재 선택된 월 인덱스 계산
  const selectedMonthString = useMemo(() => {
    return getMonthInISODateString(
      selectedYear,
      parseInt(selectedMonth.split('-')[1]),
    );
  }, [selectedYear, selectedMonth]);

  return (
    <YStack bg="$gray5" p="$4" rounded="$8" gap="$4">
      <GardenTitleHeader />
      <ScrollView horizontal>
        <GardenDayUnits />
        <XStack gap="$2">
          {months.map(({ monthKey, lastDate, firstDateDay, weekLength }) => {
            const isSelected =
              selectedMonth === getMonthInISODateString(selectedYear, monthKey);

            // 내용물은 메모이제이션하여 리렌더링 방지
            const monthContent = useMemo(
              () => (
                <YStack>
                  <GardenMonthUnits month={monthKey} isSelected={isSelected} />
                  <Garden
                    weekLength={weekLength}
                    monthKey={monthKey}
                    firstDateDay={firstDateDay}
                    selectedYear={selectedYear}
                    lastDate={lastDate}
                    getEmotionForDate={memoizedGetEmotionForDate}
                  />
                </YStack>
              ),
              [
                monthKey,
                weekLength,
                firstDateDay,
                selectedYear,
                lastDate,
                isSelected,
              ],
            );

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
                {monthContent}
              </Button>
            );
          })}
        </XStack>
      </ScrollView>
    </YStack>
  );
};
