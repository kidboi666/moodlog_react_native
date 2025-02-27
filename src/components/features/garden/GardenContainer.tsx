import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Button, YStack } from 'tamagui';
import { useEffect, useState } from 'react';
import { GardenMonthUnits } from './GardenMonthUnits';
import { Garden } from './Garden';
import { getMonthNumber } from '@/utils/common';

const AnimatedGarden = Animated.createAnimatedComponent(Button);

interface Props {
  monthString: string;
  lastDate: number;
  firstDateDay: number;
  weekLength: number;
  selectedMonth: number;
  selectedYear: number;
  getDateCountsForDate: (
    year: number,
    month: number | string,
    date: number,
  ) => number;
  onClick: (month: string) => void;
}
export const GardenContainer = ({
  monthString,
  lastDate,
  firstDateDay,
  weekLength,
  selectedMonth,
  selectedYear,
  getDateCountsForDate,
  onClick,
}: Props) => {
  const [gardenWidth, setGardenWidth] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const animatedStyle = useAnimatedStyle(() => ({
    width: withSpring(isSelected ? gardenWidth + 4 : gardenWidth),
  }));

  useEffect(() => {
    setIsSelected(selectedMonth === getMonthNumber(monthString));
  }, []);

  return (
    <AnimatedGarden
      unstyled
      animation="medium"
      animateOnly={['backgroundColor']}
      rounded="$4"
      py="$4"
      // onLayout={({ nativeEvent }) => setGardenWidth(nativeEvent.layouts.width)}
      // style={animatedStyle}
      onPress={() => onClick(monthString)}
      bg={isSelected ? '$gray7' : 'transparent'}
    >
      <YStack>
        <GardenMonthUnits month={monthString} isSelected={isSelected} />
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
};
