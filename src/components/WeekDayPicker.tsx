import { Button, Text, XStack } from 'tamagui';
import { useState } from 'react';

const WEEK_DAY = {
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
};

export const WeekDayPicker = () => {
  const [selectedDay, setSelectedDay] = useState<keyof typeof WEEK_DAY>();
  const handleSelectedDay = day => {
    setSelectedDay(day);
  };
  return (
    <XStack flex={1} justify="space-between" py="$2" rounded="$4">
      {Object.values(WEEK_DAY).map((day, i) => (
        <Button
          animation="medium"
          key={day}
          bg={selectedDay === day ? '$background' : 'transparent'}
          flexDirection="column"
          p="$3"
          items="center"
          rounded="$4"
          unstyled
          pressStyle={{
            scale: 0.95,
          }}
          onPress={() => handleSelectedDay(day)}
        >
          <Text fontSize="$2" color="$gray9">
            {day}
          </Text>
          <Text fontSize="$5" fontWeight="800" color="$gray11">
            {i + 10}
          </Text>
        </Button>
      ))}
    </XStack>
  );
};
