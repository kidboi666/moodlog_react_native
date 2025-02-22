import {
  Calendar,
  CalendarProps,
  CalendarUtils,
  LocaleConfig,
} from 'react-native-calendars';
import { CustomDayComponent } from '@/components/CustomDayComponent';
import { Button } from 'tamagui';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import React from 'react';
import { DateCounts } from '@/types/entries';
import { ISODateString } from '@/types/dtos/date';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
  ],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
  ],
  dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
LocaleConfig.defaultLocale = 'ko';

interface Props extends CalendarProps {
  dateCounts: DateCounts;
  variant?: 'contained' | 'default';
  onChangeSelectedDate: (date: ISODateString) => void;
  selectedDate?: ISODateString;
}

export const CalendarBase = ({
  dateCounts,
  variant = 'default',
  onChangeSelectedDate,
  selectedDate,
  ...props
}: Props) => {
  return (
    <Calendar
      dayComponent={({ date, state, marking }) => (
        <CustomDayComponent
          variant={variant}
          date={date}
          state={state}
          dateCounts={dateCounts}
          marking={marking}
          onPress={() => {
            onChangeSelectedDate(date?.dateString);
          }}
        />
      )}
      current={CalendarUtils.getCalendarDateString(new Date())}
      enableSwipeMonths
      maxDate={CalendarUtils.getCalendarDateString(new Date())}
      onDayPress={day => onChangeSelectedDate(day.dateString)}
      markedDates={
        selectedDate && {
          [selectedDate]: {
            selected: true,
            disabledTouchEvent: true,
          },
        }
      }
      renderArrow={direction => (
        <Button
          unstyled
          p="$1"
          color="$gray10"
          icon={
            direction === 'left' ? (
              <ArrowLeft size="$1" />
            ) : (
              <ArrowRight size="$1" />
            )
          }
        />
      )}
      {...props}
    />
  );
};
