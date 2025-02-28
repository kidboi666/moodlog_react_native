import { CalendarBase } from '@/components/CalendarBase';
import React from 'react';
import { useTheme } from 'tamagui';
import { ISODateString } from '@/types/dtos/date';
import { DateCounts } from '@/types/entries';

interface Props {
  onChangeLocalDate: (date: ISODateString) => void;
  dateCounts: DateCounts;
  localDate?: ISODateString;
}

export const DatePickerModal = ({
  onChangeLocalDate,
  dateCounts,
  localDate,
}: Props) => {
  const theme = useTheme();
  return (
    <CalendarBase
      variant="contained"
      onSelectedDateChange={onChangeLocalDate}
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
