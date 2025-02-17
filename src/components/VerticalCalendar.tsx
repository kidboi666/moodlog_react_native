import { EnterStyle } from '@/constants/styles';
import { Calendar, CalendarUtils } from 'react-native-calendars';
import { CustomDayComponent } from '@/components/CustomDayComponent';
import { WEEK_DAY } from '@/constants/date';
import { useTheme, View } from 'tamagui';
import React from 'react';

export const VerticalCalendar = ({
  onSelectedDate,
  selectedDate,
  currentYear,
  currentMonth,
}) => {
  const theme = useTheme();
  return (
    <View animation="quick" flex={1} enterStyle={EnterStyle}>
      <Calendar
        dayComponent={({ date, state, marking }) => (
          <CustomDayComponent
            date={date}
            state={state}
            marking={marking}
            onPress={() => {
              onSelectedDate({
                date: date.day,
                day: WEEK_DAY[new Date(date.timestamp).getDay()],
              });
            }}
          />
        )}
        current={CalendarUtils.getCalendarDateString(new Date().getTime())}
        maxDate={CalendarUtils.getCalendarDateString(new Date())}
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
          todayBackgroundColor: theme.gray5.val,
          dayTextColor: theme.gray1.val,
          textDisabledColor: theme.gray11.val,
        }}
      />
    </View>
  );
};
