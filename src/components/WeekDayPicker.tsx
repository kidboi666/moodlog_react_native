import { Button, H1, useTheme, View, XStack, YStack } from 'tamagui';
import { MONTHS, WEEK_DAY } from '@/constants/date';
import React, { useCallback, useMemo, useState } from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { SelectedDate } from '@/types/dtos/date';
import { HorizontalCalendar } from '@/components/HorizontalCalendar';
import { CalendarDays, CalendarRange } from '@tamagui/lucide-icons';
import { EnterStyle, PressStyle } from '@/constants/styles';
import { Calendar, CalendarUtils } from 'react-native-calendars';
import { useThemeContext } from '@/store/hooks/useThemeContext';

export const WeekDayPicker = () => {
  const [variation, setVariation] = useState<'horizontal' | 'calendar'>(
    'horizontal',
  );
  const { currentTheme } = useThemeContext();
  const theme = useTheme();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    date: currentDate.getDate(),
    day: Object.values(WEEK_DAY)[currentDay],
  });
  const { updateSelectedJournals } = useJournalContext();

  const dates = useMemo(() => {
    const lastDate = new Date(currentYear, currentMonth, 0).getDate();

    return Array.from({ length: lastDate }, (_, i) => {
      const date = new Date(currentYear, currentMonth, i + 1);
      return {
        date: i + 1,
        day: Object.values(WEEK_DAY)[date.getDay()],
      };
    });
  }, [currentYear, currentMonth]);

  const handleSelectedDate = useCallback(
    (date: SelectedDate) => {
      setSelectedDate(date);

      const timeStamp = new Date(
        currentYear,
        currentMonth,
        date.date + 1,
      ).getTime();
      updateSelectedJournals(CalendarUtils.getCalendarDateString(timeStamp));
    },
    [currentYear, currentMonth, updateSelectedJournals],
  );

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
      <XStack justify="space-between">
        <H1 fontWeight="800" color="$gray1">
          {Object.values(MONTHS)[currentMonth]}.
        </H1>
        <Button
          animation="quick"
          unstyled
          color="$gray1"
          icon={
            variation === 'calendar' ? (
              <CalendarDays size="$1" />
            ) : (
              <CalendarRange size="$1" />
            )
          }
          pressStyle={PressStyle}
          onPress={() =>
            setVariation(prev =>
              prev === 'horizontal' ? 'calendar' : 'horizontal',
            )
          }
        />
      </XStack>
      {variation === 'horizontal' && (
        <XStack
          animation="quick"
          enterStyle={EnterStyle}
          flex={1}
          justify="center"
          rounded="$4"
          items="center"
        >
          <HorizontalCalendar
            key={currentTheme}
            dates={dates}
            selectedDate={selectedDate}
            currentDate={currentDate}
            onChangeSelectedDate={handleSelectedDate}
          />
        </XStack>
      )}
      {variation === 'calendar' && (
        <View animation="quick" flex={1} enterStyle={EnterStyle}>
          <Calendar
            key={currentTheme}
            current={CalendarUtils.getCalendarDateString(new Date().getTime())}
            maxDate={CalendarUtils.getCalendarDateString(new Date())}
            hideExtraDays
            onDayPress={day =>
              handleSelectedDate({
                date: day.day,
                day: WEEK_DAY[new Date(day.timestamp).getDay()],
              })
            }
            customHeader={() => null}
            markedDates={
              selectedDate.date && {
                [CalendarUtils.getCalendarDateString(
                  new Date(currentYear, currentMonth, selectedDate.date),
                )]: {
                  selected: true,
                  disabledTouchEvent: true,
                },
              }
            }
            theme={{
              monthTextColor: theme.gray11.val,
              calendarBackground: theme.gray12.val,
              selectedDayBackgroundColor: theme.red1.val,
              selectedDayTextColor: theme.gray11.val,
              todayTextColor: theme.gray11.val,
              textDayFontWeight: '500',
              textDayFontSize: 14,
              weekVerticalMargin: 12,
              todayBackgroundColor: theme.gray5.val,
              dayTextColor: theme.gray1.val,
              textDisabledColor: theme.gray11.val,
            }}
          />
        </View>
      )}
    </YStack>
  );
};
