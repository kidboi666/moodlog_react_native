import { Button, H1, Text, View, XStack, YStack } from 'tamagui';
import { WEEK_DAY } from '@/constants/date';
import { WeekDayValue } from '@/types/common';
import { useState } from 'react';
import { transformISODate } from '@/utils/common/transformSnakeTime';
import { useJournalContext } from '@/store/hooks/useJournalContext';

export const WeekDayPicker = () => {
  const { updateSelectedJournals } = useJournalContext();
  const [selectedDate, setSelectedDate] = useState<{
    month: number;
    date: number;
    day: WeekDayValue;
  }>({
    month: new Date().getMonth(),
    date: new Date().getDate(),
    day: Object.values(WEEK_DAY)[new Date().getDay()],
  });

  const handleSelectedDate = (date: {
    day: WeekDayValue;
    date: number;
    month: number;
  }) => {
    setSelectedDate(date);

    const timeStamp = new Date(
      new Date().getFullYear(),
      date.month,
      date.date + 1,
    ).getTime();
    console.log(date);
    console.log(transformISODate(timeStamp));
    updateSelectedJournals(transformISODate(timeStamp));
  };

  const currentDate = new Date();

  return (
    <YStack
      animation="medium"
      gap="$2"
      mb="$4"
      p="$4"
      bg="$gray12"
      rounded="$8"
      enterStyle={{
        y: -300,
      }}
    >
      <H1 fontWeight="800" color="$gray1">
        {Object.values(WEEK_DAY)[new Date().getDay()]}.
      </H1>
      <XStack flex={1} justify="space-between" rounded="$4">
        {Object.values(WEEK_DAY).map((day, i) => {
          const date = currentDate.getDate() - currentDate.getDay() + i;
          const month = currentDate.getMonth();

          return (
            <Button
              animation="quick"
              key={day}
              bg={selectedDate.day === day ? '$background' : 'transparent'}
              p="$3"
              rounded="$4"
              unstyled
              pressStyle={{
                scale: 0.9,
              }}
              onPress={() => handleSelectedDate({ day, date, month })}
            >
              <YStack gap="$2" items="center">
                <Text
                  fontSize="$2"
                  color={selectedDate.day === day ? '$gray12' : '$gray9'}
                >
                  {day}
                </Text>
                <Text
                  fontSize="$5"
                  fontWeight="800"
                  color={selectedDate.day === day ? '$gray12' : '$gray6'}
                >
                  {date}
                </Text>
                {currentDate.getDate() === date && (
                  <View
                    position="absolute"
                    width="$0.5"
                    height="$0.5"
                    bg={selectedDate.day === day ? '$gray12' : '$gray1'}
                    rounded="$1"
                    b={-8}
                  />
                )}
              </YStack>
            </Button>
          );
        })}
      </XStack>
    </YStack>
  );
};
