import { Calendar, CalendarUtils } from 'react-native-calendars';
import { CalendarDays, ChevronLeft, ChevronRight } from '@tamagui/lucide-icons';
import { Button, useTheme } from 'tamagui';
import React, { useEffect } from 'react';
import { BottomModal } from '@/components/modals/BottomModal';
import { PRESS_STYLE } from '@/constants/styles';
import { useBottomModalContext } from '@/store/hooks/useBottomModalContext';

interface Props {
  localDate?: string;
  onChangeLocalDate: (date: string) => void;
}

export const CalendarPicker = ({ localDate, onChangeLocalDate }: Props) => {
  const theme = useTheme();
  const { modalRef, openModal } = useBottomModalContext();

  useEffect(() => {
    if (!localDate) {
      onChangeLocalDate(
        CalendarUtils.getCalendarDateString(new Date().getTime()),
      );
    }
  }, []);
  return (
    <>
      <Button
        unstyled
        animation="quick"
        p="$2"
        color="$gray12"
        icon={<CalendarDays size="$1" />}
        onPress={openModal}
        pressStyle={PRESS_STYLE}
      />
      <BottomModal ref={modalRef}>
        <Calendar
          key={localDate}
          current={CalendarUtils.getCalendarDateString(new Date().getTime())}
          enableSwipeMonths
          maxDate={CalendarUtils.getCalendarDateString(new Date())}
          onDayPress={day =>
            onChangeLocalDate(
              CalendarUtils.getCalendarDateString(day.timestamp),
            )
          }
          futureScrollRange={1}
          markedDates={
            localDate && {
              [localDate]: {
                selected: true,
                disabledTouchEvent: true,
              },
            }
          }
          renderArrow={direction => (
            <Button
              unstyled
              p="$3"
              color="$gray11"
              rounded="$8"
              icon={
                direction === 'left' ? (
                  <ChevronLeft size="$1" />
                ) : (
                  <ChevronRight size="$1" />
                )
              }
            />
          )}
          theme={{
            backgroundColor: theme.background.val,
            monthTextColor: theme.gray11.val,
            calendarBackground: theme.background.val,
            selectedDayBackgroundColor: theme.gray8.val,
            selectedDayTextColor: theme.gray12.val,
            todayTextColor: theme.gray11.val,
            textDayFontWeight: '500',
            textDayFontSize: 14,
            weekVerticalMargin: 12,
            todayBackgroundColor: theme.gray5.val,
            dayTextColor: theme.gray11.val,
            textDisabledColor: theme.gray7.val,
          }}
        />
      </BottomModal>
    </>
  );
};
