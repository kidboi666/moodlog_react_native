import { useEffect, useRef } from 'react';
import { Button, ScrollView, Text, View, YStack } from 'tamagui';
import { SelectedDate } from '@/types/dtos/date';
import { CALENDAR_SCROLL_SIZE } from '@/constants/size';

interface Props {
  dates: SelectedDate[];
  selectedDate: SelectedDate;
  currentDate: Date;
  onChangeSelectedDate: (item: SelectedDate) => void;
}

export const HorizontalCalendar = ({
  dates,
  selectedDate,
  currentDate,
  onChangeSelectedDate,
}: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (dates.length > 0) {
      const selectedIndex = dates.findIndex(
        date => date.date === selectedDate.date,
      );

      if (selectedIndex !== -1 && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: selectedIndex * CALENDAR_SCROLL_SIZE,
          animated: true,
        });
      }
    }
  }, [dates]);

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={CALENDAR_SCROLL_SIZE}
      >
        {dates.map(date => {
          const isToday = date.date === currentDate.getDate();
          return (
            <Button
              key={date.date}
              bg={selectedDate.date === date.date ? '$gray5' : 'transparent'}
              p="$3"
              width={CALENDAR_SCROLL_SIZE}
              rounded="$4"
              unstyled
              borderWidth={isToday ? 1 : 0}
              borderColor="$gray1"
              onPress={() =>
                onChangeSelectedDate({
                  day: date.day,
                  date: date.date,
                })
              }
            >
              <YStack gap="$2" items="center">
                <Text
                  fontSize="$2"
                  color={selectedDate.date === date.date ? '$gray12' : '$gray9'}
                >
                  {date.day}
                </Text>
                <Text
                  fontSize="$5"
                  fontWeight="800"
                  color={selectedDate.date === date.date ? '$gray12' : '$gray6'}
                >
                  {date.date}
                </Text>
                {isToday && (
                  <View
                    position="absolute"
                    width="$0.5"
                    height="$0.5"
                    bg={selectedDate.day === date.day ? '$gray12' : '$gray1'}
                    rounded="$1"
                    b={-8}
                  />
                )}
              </YStack>
            </Button>
          );
        })}
      </ScrollView>
    </View>
  );
};
