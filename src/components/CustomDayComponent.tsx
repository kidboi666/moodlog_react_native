import { Button, Text } from 'tamagui';
import React from 'react';

export const CustomDayComponent = ({ date, state, marking, onPress }) => {
  const isSelected = marking?.selected;
  const isToday = state === 'today';
  const isDisabled = state === 'disabled';

  return (
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
      elevate
    >
      <Text
        fontWeight="800"
        fontSize="$3"
        color={isSelected ? '$gray12' : '$gray6'}
      >
        {date.day}
      </Text>
    </Button>
  );
};
