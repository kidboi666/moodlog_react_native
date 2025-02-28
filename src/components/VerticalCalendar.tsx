import { ENTER_STYLE, ENTER_STYLE_KEY } from '@/constants/styles';
import { useTheme, View } from 'tamagui';
import React from 'react';
import { ISODateString } from '@/types/dtos/date';
import { DateCounts } from '@/types/entries';
import { CalendarBase } from '@/components/CalendarBase';

interface Props {
  onSelectedDateChange: (date: ISODateString) => void;
  selectedDate: ISODateString;
  dateCounts: DateCounts;
}

export const VerticalCalendar = ({
  onSelectedDateChange,
  selectedDate,
  dateCounts,
}: Props) => {
  const theme = useTheme();
  return (
    <View
      flex={1}
      animation="quick"
      animateOnly={ENTER_STYLE_KEY}
      enterStyle={ENTER_STYLE}
    >
      <CalendarBase
        selectedDate={selectedDate}
        dateCounts={dateCounts}
        variant="default"
        onSelectedDateChange={onSelectedDateChange}
        theme={{
          calendarBackground: theme.gray12.val,
          monthTextColor: theme.gray1.val,
          textMonthFontWeight: '800',
        }}
      />
    </View>
  );
};
