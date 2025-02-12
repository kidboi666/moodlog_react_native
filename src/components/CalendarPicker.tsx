import { Calendar } from 'react-native-calendars';
import { Calendar as CalendarIcon } from '@tamagui/lucide-icons';
import { Button, Popover, Text, useTheme } from 'tamagui';
import { CurrentDate } from '@/components/Date';
import React, { useEffect } from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';

export const CalendarPicker = () => {
  const theme = useTheme();
  const { updateDraftLocalDate, draft } = useJournalContext();

  const transformSnakeTime = (time: number) => {
    return new Date(time).toISOString().split('T')[0];
  };

  const handleChangeDate = (date: number) => {
    updateDraftLocalDate(transformSnakeTime(date));
  };

  useEffect(() => {
    if (!draft.localDate) {
      handleChangeDate(Date.now());
    }
  }, []);

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
          <CurrentDate
            timestamp={
              draft?.localDate ? draft.localDate : new Date().getTime()
            }
          />
        </Button>
      </Popover.Trigger>
      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevation="$1"
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
          current={transformSnakeTime(new Date().getTime())}
          enableSwipeMonths
          onDayPress={day => handleChangeDate(day.timestamp)}
          markedDates={
            draft.localDate && {
              [draft.localDate]: {
                selected: true,
                disabledTouchEvent: true,
                selectedDotColor: 'red',
              },
            }
          }
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
