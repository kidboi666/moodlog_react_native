import { useEffect, useRef } from 'react';
import { Button, ScrollView, Text, View, XStack, YStack } from 'tamagui';
import { ISODateString } from '@/types/dtos/date';
import { CALENDAR_SCROLL_SIZE } from '@/constants/size';
import { ENTER_STYLE, ENTER_STYLE_KEY } from '@/constants/styles';
import { DateCounts } from '@/types/entries';
import { CalendarUtils } from 'react-native-calendars';
import { DateCountDot } from '@/components/DateCountDot';
import { useTranslation } from 'react-i18next';
import { getDateInISODateString, getDayInISODateString } from '@/utils/common';

interface Props {
  dates: ISODateString[];
  selectedDate: ISODateString;
  dateCounts: DateCounts;
  currentDate: Date;
  onSelectedDateChange: (date: ISODateString) => void;
}

export const HorizontalCalendar = ({
  dateCounts,
  dates,
  selectedDate,
  currentDate,
  onSelectedDateChange,
}: Props) => {
  const { t } = useTranslation();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSelectedDateChange = (date: ISODateString) => {
    if (CalendarUtils.getCalendarDateString(currentDate) >= date) {
      onSelectedDateChange(date);
    }
  };

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
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [dates]);

  return (
    <XStack
      animation="quick"
      animateOnly={ENTER_STYLE_KEY}
      enterStyle={ENTER_STYLE}
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
            const isFuture =
              date > CalendarUtils.getCalendarDateString(currentDate);
            return (
              <Button
                key={date}
                bg={selectedDate === date ? '$gray5' : 'transparent'}
                py="$3"
                width={CALENDAR_SCROLL_SIZE}
                rounded="$4"
                unstyled
                borderWidth={isToday ? 1 : 0}
                borderColor="$gray1"
                onPress={() => handleSelectedDateChange(date)}
              >
                <YStack items="center">
                  <YStack gap="$2" items="center">
                    <Text
                      fontSize="$2"
                      color={selectedDate === date ? '$gray12' : '$gray9'}
                    >
                      {t(`calendar.days.${getDayInISODateString(date)}`)}
                    </Text>
                    <Text
                      fontSize="$5"
                      fontWeight="800"
                      color={
                        isFuture
                          ? '$gray11'
                          : selectedDate === date
                            ? '$gray12'
                            : '$gray6'
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
