import { Calendar } from 'react-native-calendars';
import { Calendar as CalendarIcon } from '@tamagui/lucide-icons';
import { Button, Popover, Text, useTheme } from 'tamagui';
import { CurrentDate } from '@/components/shared/Date';
import React, { useState } from 'react';

export const CalendarPicker = () => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState();
  const today = new Date().toISOString().split('T')[0];

  return (
    <Popover placement="bottom-start">
      <Popover.Trigger>
        <Button
          unstyled
          pl="$0.5"
          icon={CalendarIcon}
          items="center"
          flexDirection="row"
        >
          <CurrentDate />
        </Button>
      </Popover.Trigger>
      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        flexDirection="column"
      >
        <Calendar
          current={today}
          enableSwipeMonths
          renderArrow={direction => (
            <Text style={{ color: theme.blue10.val, fontSize: 20 }}>
              {direction === 'left' ? '<' : '>'}
            </Text>
          )}
          theme={{
            backgroundColor: theme.background.val,
            calendarBackground: theme.background.val,
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: theme.gray1.val,
            todayBackgroundColor: theme.blue10.val,
            mondayTextColor: theme.color.val,
            dayTextColor: theme.blue10.val,
            textDisabledColor: theme.gray7.val,
          }}
        />
      </Popover.Content>
    </Popover>
  );
};
