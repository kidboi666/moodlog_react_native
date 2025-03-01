import { CalendarBase } from '@/components/CalendarBase';
import React from 'react';
import { useTheme } from 'tamagui';
import { ISODateString, ISOMonthString } from '@/types/dtos/date';
import { DateCounts } from '@/types/entries';

interface Props {
  onLocalDateChange: (date: ISODateString) => void;
  onSelectedMonthChange: (date: ISOMonthString) => void;
  dateCounts: DateCounts;
  localDate?: ISODateString;
}

export const DatePickerModal = ({
  onLocalDateChange,
  onSelectedMonthChange,
  dateCounts,
  localDate,
}: Props) => {
  const theme = useTheme();
  return (
    <CalendarBase
      variant="contained"
      onSelectedMonthChange={onSelectedMonthChange}
      onSelectedDateChange={onLocalDateChange}
      dateCounts={dateCounts}
      selectedDate={localDate}
      theme={{
        backgroundColor: theme.background.val,
        calendarBackground: theme.background.val,
        monthTextColor: theme.gray12.val,
        textMonthFontWeight: '800',
      }}
    />
  );
};
