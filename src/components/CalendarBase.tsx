import {
  Calendar,
  CalendarProps,
  CalendarUtils,
  DateData,
  LocaleConfig,
} from 'react-native-calendars';
import { CustomDayComponent } from '@/components/CustomDayComponent';
import { Button } from 'tamagui';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import React from 'react';
import { DateCounts } from '@/types/entries';
import { ISODateString, ISOMonthString } from '@/types/dtos/date';
import { DayState, Direction } from 'react-native-calendars/src/types';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { getMonthInISODateString } from '@/utils/common';

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
  onSelectedDateChange: (date: ISODateString) => void;
  onSelectedMonthChange: (month: ISOMonthString) => void;
  selectedDate?: ISODateString;
}

export const CalendarBase = ({
  dateCounts,
  variant = 'default',
  onSelectedDateChange,
  onSelectedMonthChange,
  selectedDate,
  ...props
}: Props) => {
  return (
    <Calendar
      dayComponent={({
        date,
        state,
        marking,
      }: {
        date: DateData;
        state: DayState;
        marking: MarkingProps;
      }) => (
        <CustomDayComponent
          variant={variant}
          date={date}
          state={state}
          dateCounts={dateCounts}
          marking={marking}
          onPress={() => {
            onSelectedDateChange(date.dateString as ISODateString);
          }}
        />
      )}
      hideExtraDays
      current={selectedDate}
      enableSwipeMonths
      maxDate={CalendarUtils.getCalendarDateString(new Date())}
      onDayPress={(date: DateData) =>
        onSelectedDateChange(date.dateString as ISODateString)
      }
      onMonthChange={(date: DateData) =>
        onSelectedMonthChange(
          getMonthInISODateString(date.year, date.month - 1),
        )
      }
      markedDates={
        selectedDate && {
          [selectedDate]: {
            selected: true,
            disabledTouchEvent: true,
          },
        }
      }
      renderArrow={(direction: Direction) => (
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
