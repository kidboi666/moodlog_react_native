import { Button, styled, Text, YStack } from 'tamagui';
import React from 'react';
import { DateData } from 'react-native-calendars';
import { DayState } from 'react-native-calendars/src/types';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { IDateCounts } from '@/types/entries';
import { DateCountDot } from '@/components/DateCountDot';

const StyledDayButton = styled(Button, {
  name: 'StyledDayButton',
  width: '$4',
  height: '$4',
  p: 0,
  rounded: '$6',

  variants: {
    variant: {
      default: {
        borderColor: '$gray6',
      },
      contained: {
        borderColor: '$gray12',
      },
    },
    isSelected: {
      true: {},
      false: {
        bg: 'transparent',
      },
    },
    isToday: {
      true: {
        borderWidth: 3,
      },
      false: {
        borderWidth: 0,
      },
    },
    isDisabled: {
      true: {
        opacity: 0.2,
      },
      false: {
        opacity: 1,
      },
    },
  } as const,

  // variants 조합
  defaultVariants: {
    variant: 'default',
    isSelected: false,
    isToday: false,
    isDisabled: false,
  },
});

const DayText = styled(Text, {
  name: 'DayText',
  fontWeight: '800',
  fontSize: '$3',

  variants: {
    variant: {
      default: {},
      contained: {},
    },
    isSelected: {
      true: {},
      false: {},
    },
  },

  defaultVariants: {
    variant: 'default',
    isSelected: false,
  },
});

interface Props {
  date: DateData;
  state: DayState;
  marking: MarkingProps;
  onPress: () => void;
  variant?: 'default' | 'contained';
  dateCounts?: IDateCounts;
}

export const CustomDayComponent = ({
  date,
  state,
  marking,
  onPress,
  variant = 'default',
  dateCounts,
}: Props) => {
  const isSelected = marking?.selected;
  const isToday = state === 'today';
  const isDisabled = state === 'disabled';

  return (
    <StyledDayButton
      variant={variant}
      isSelected={isSelected}
      isToday={isToday}
      isDisabled={isDisabled}
      onPress={onPress}
      disabled={isDisabled}
      bg={
        isSelected
          ? variant === 'contained'
            ? '$gray12'
            : '$gray6'
          : 'transparent'
      }
    >
      <YStack items="center">
        <DayText
          variant={variant}
          isSelected={isSelected}
          color={
            variant === 'contained'
              ? isSelected
                ? '$gray6'
                : '$gray12'
              : isSelected
                ? '$gray12'
                : '$gray6'
          }
        >
          {date.day}
        </DayText>
        <DateCountDot
          dateCounts={dateCounts}
          dateString={date.dateString}
          isSelected={isSelected}
          variant={variant}
        />
      </YStack>
    </StyledDayButton>
  );
};
