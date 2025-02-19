import { Button, Text, YStack } from 'tamagui';
import React from 'react';
import { DateData } from 'react-native-calendars';
import { DayState } from 'react-native-calendars/src/types';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { IDateCounts } from '@/types/entries';
import { DateCountDot } from '@/components/DateCountDot';

interface Props {
  date: DateData;
  state: DayState;
  marking: MarkingProps;
  onPress: () => void;
  dateCounts: IDateCounts;
}

export const CustomDayComponent = ({
  date,
  state,
  marking,
  onPress,
  dateCounts,
}: Props) => {
  const isSelected = marking?.selected;
  const isToday = state === 'today';
  const isDisabled = state === 'disabled';

  return (
    <>
      <Button
        width="$4"
        height="$4"
        p={0}
        bg={isSelected ? '$gray6' : 'transparent'}
        borderWidth={isToday ? 3 : 0}
        rounded="$12"
        opacity={isDisabled ? 0.2 : 1}
        borderColor={isToday ? '$gray6' : 'transparent'}
        onPress={onPress}
        disabled={isDisabled}
      >
        <YStack items="center">
          <Text
            fontWeight="800"
            fontSize="$3"
            color={isSelected ? '$gray12' : '$gray6'}
          >
            {date.day}
          </Text>
          <DateCountDot
            dateCounts={dateCounts}
            dateString={date.dateString}
            isSelected={isSelected}
          />
        </YStack>
      </Button>
    </>
  );
};
