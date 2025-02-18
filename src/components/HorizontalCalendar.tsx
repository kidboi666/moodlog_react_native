import { useEffect, useRef } from 'react';
import {
  Button,
  ScrollView,
  Text,
  useTheme,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { SelectedDate } from '@/types/dtos/date';
import { CALENDAR_SCROLL_SIZE } from '@/constants/size';
import { EnterStyle } from '@/constants/styles';
import { IDateCounts } from '@/types/entries';

interface Props {
  dates: SelectedDate[];
  selectedDate: SelectedDate;
  currentDate: Date;
  dateCounts: IDateCounts;
  onChangeSelectedDate: (item: SelectedDate) => void;
}

export const HorizontalCalendar = ({
  dateCounts,
  dates,
  selectedDate,
  currentDate,
  onChangeSelectedDate,
}: Props) => {
  const theme = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (dates.length > 0) {
      const selectedIndex = dates.findIndex(
        date => date.date === selectedDate.date,
      );
      timeout = setTimeout(() => {
        if (selectedIndex !== -1 && scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: selectedIndex * CALENDAR_SCROLL_SIZE,
            animated: true,
          });
        }
      }, 600);
    }

    return () => clearTimeout(timeout);
  }, [dates]);

  return (
    <XStack
      animation="quick"
      enterStyle={EnterStyle}
      flex={1}
      justify="center"
      rounded="$4"
      items="center"
    >
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
                bg={
                  selectedDate.date === date.date
                    ? (theme.gray5.val as any)
                    : 'transparent'
                }
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
                    color={
                      selectedDate.date === date.date
                        ? (theme.gray12.val as any)
                        : (theme.gray9.val as any)
                    }
                  >
                    {date.day}
                  </Text>
                  <Text
                    fontSize="$5"
                    fontWeight="800"
                    color={
                      selectedDate.date === date.date
                        ? (theme.gray12.val as any)
                        : (theme.gray6.val as any)
                    }
                  >
                    {date.date}
                  </Text>
                  {isToday && (
                    <View
                      position="absolute"
                      width="$0.5"
                      height="$0.5"
                      bg={
                        selectedDate.day === date.day
                          ? (theme.gray12.val as any)
                          : (theme.gray1.val as any)
                      }
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
    </XStack>
  );
};
