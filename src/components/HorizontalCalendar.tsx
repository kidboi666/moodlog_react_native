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
import { ISODateString } from '@/types/dtos/date';
import { CALENDAR_SCROLL_SIZE } from '@/constants/size';
import { EnterStyle } from '@/constants/styles';
import { IDateCounts } from '@/types/entries';
import { CalendarUtils } from 'react-native-calendars';
import {
  getDateInISODateString,
  getDayInISODateString,
} from '@/utils/common/date';
import { DateCountDot } from '@/components/DateCountDot';

interface Props {
  dates: ISODateString[];
  selectedDate: ISODateString;
  currentDate: Date;
  dateCounts: IDateCounts;
  onChangeSelectedDate: (date: ISODateString) => void;
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
      const selectedIndex = dates.findIndex(date => date === selectedDate);
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
            const isToday =
              date === CalendarUtils.getCalendarDateString(currentDate);
            return (
              <Button
                key={date}
                bg={
                  selectedDate === date
                    ? (theme.gray5.val as any)
                    : 'transparent'
                }
                p="$3"
                width={CALENDAR_SCROLL_SIZE}
                rounded="$4"
                unstyled
                borderWidth={isToday ? 1 : 0}
                borderColor="$gray1"
                onPress={() => onChangeSelectedDate(date)}
              >
                <YStack items="center">
                  <YStack gap="$2" items="center">
                    <Text
                      fontSize="$2"
                      color={
                        selectedDate === date
                          ? (theme.gray12.val as any)
                          : (theme.gray9.val as any)
                      }
                    >
                      {getDayInISODateString(date)}
                    </Text>
                    <Text
                      fontSize="$5"
                      fontWeight="800"
                      color={
                        selectedDate === date
                          ? (theme.gray12.val as any)
                          : (theme.gray6.val as any)
                      }
                    >
                      {getDateInISODateString(date)}
                    </Text>
                  </YStack>
                  <DateCountDot
                    dateCounts={dateCounts}
                    dateString={date}
                    isSelected={selectedDate === date}
                  />
                </YStack>
              </Button>
            );
          })}
        </ScrollView>
      </View>
    </XStack>
  );
};
