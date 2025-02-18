import { EnterStyle } from '@/constants/styles';
import { Calendar, CalendarUtils } from 'react-native-calendars';
import { CustomDayComponent } from '@/components/CustomDayComponent';
import { useTheme, View } from 'tamagui';
import React from 'react';
import { ISODateString } from '@/types/dtos/date';
import { IDateCounts } from '@/types/entries';

interface Props {
  onChangeSelectedDate: (date: ISODateString) => void;
  selectedDate: ISODateString;
  currentYear: number;
  dateCounts: IDateCounts;
  currentMonth: number;
}

export const VerticalCalendar = ({
  onChangeSelectedDate,
  selectedDate,
  currentYear,
  dateCounts,
  currentMonth,
}: Props) => {
  const theme = useTheme();
  return (
    <View animation="quick" flex={1} enterStyle={EnterStyle}>
      <Calendar
        dayComponent={({ date, state, marking }) => (
          <CustomDayComponent
            date={date}
            state={state}
            dateCounts={dateCounts}
            marking={marking}
            onPress={() => {
              onChangeSelectedDate(date?.dateString);
            }}
          />
        )}
        current={CalendarUtils.getCalendarDateString(new Date().getTime())}
        maxDate={CalendarUtils.getCalendarDateString(new Date())}
        customHeader={() => null}
        markedDates={
          selectedDate && {
            [selectedDate]: {
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
