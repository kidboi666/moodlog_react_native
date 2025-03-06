import {
  CalendarList,
  CalendarProps,
  CalendarUtils,
  DateData,
  LocaleConfig,
} from 'react-native-calendars';
import { Button } from 'tamagui';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import React, { useCallback, useMemo } from 'react';
import { DateCounts } from '@/types/entries';
import { ISODateString, ISOMonthString } from '@/types/dtos/date';
import { Direction } from 'react-native-calendars/src/types';
import { CustomDayComponent } from '@/components/CustomDayComponent';
import { DayProps } from 'react-native-calendars/src/calendar/day';

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
  onSelectedDateChange: (date: ISODateString) => void;
  onSelectedMonthChange: (month: ISOMonthString) => void;
  selectedDate?: ISODateString;
  pastScrollRange: number;
  futureScrollRange: number;
}

export const CalendarListBase = ({
  dateCounts,
  pastScrollRange,
  futureScrollRange,
  onSelectedDateChange,
  onSelectedMonthChange,
  selectedDate,
  ...props
}: Props) => {
  const handleDayPress = useCallback(
    (date: DateData) => {
      onSelectedDateChange(date.dateString as ISODateString);
    },
    [onSelectedDateChange],
  );

  const markedDates = useMemo(() => {
    if (selectedDate) {
      return {
        [selectedDate]: {
          selected: true,
          disableTouchEvent: true,
        },
      };
    }
    return {};
  }, [selectedDate]);

  const DayComponentWrapper = useCallback(
    (props: DayProps) => {
      const { date, state, marking } = props;

      if (!date) {
        return null;
      }

      return (
        <CustomDayComponent
          date={date as unknown as DateData}
          state={state!}
          dateCounts={dateCounts}
          marking={marking!}
          onPress={() => handleDayPress(date as unknown as DateData)}
        />
      );
    },
    [dateCounts, onSelectedDateChange],
  );

  return (
    <CalendarList
      dayComponent={DayComponentWrapper}
      pastScrollRange={pastScrollRange}
      futureScrollRange={futureScrollRange}
      hideExtraDays
      current={selectedDate}
      maxDate={CalendarUtils.getCalendarDateString(new Date())}
      onDayPress={(date: DateData) =>
        onSelectedDateChange(date.dateString as ISODateString)
      }
      markedDates={markedDates}
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
