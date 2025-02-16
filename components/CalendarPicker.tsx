import { Calendar } from 'react-native-calendars';
import { CalendarDays } from '@tamagui/lucide-icons';
import { Button, Popover, Text, useTheme } from 'tamagui';
import React, { useEffect } from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { transformISODate } from '@/utils/common/transformSnakeTime';
import { CurrentDate } from '@/components/CurrentDate';

interface Props {
  time?: string;
}

export const CalendarPicker = ({ time }: Props) => {
  const theme = useTheme();
  const { updateDraftLocalDate, draft } = useJournalContext();

  const handleChangeDate = (date: number) => {
    updateDraftLocalDate(transformISODate(date));
  };

  useEffect(() => {
    if (!draft.localDate) {
      handleChangeDate(Date.now());
    }
  }, []);

  return (
    <Popover placement="bottom-start">
      <Popover.Trigger asChild>
        <Button
          unstyled
          animation="quick"
          p="$2"
          color="$gray11"
          icon={<CalendarDays size="$1" />}
          pressStyle={{
            opacity: 0.5,
            scale: 0.95,
          }}
        />
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
        <CurrentDate localDate={time ? time : draft?.localDate} />

        <Calendar
          current={transformISODate(new Date().getTime())}
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
