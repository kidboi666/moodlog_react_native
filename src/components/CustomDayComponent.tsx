import { Button, styled, Text, YStack } from 'tamagui';
import React, { memo } from 'react';
import { DateData } from 'react-native-calendars';
import { DayState } from 'react-native-calendars/src/types';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { DateCounts } from '@/types/entries';
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
  dateCounts?: DateCounts;
}

export const CustomDayComponent = memo(
  ({ date, state, marking, onPress, dateCounts }: Props) => {
    const isSelected = marking?.selected;
    const isToday = state === 'today';
    const isDisabled = state === 'disabled';

    return (
      <Button
        unstyled
        width="$4"
        height="$4"
        justify="center"
        onPress={onPress}
        disabled={isDisabled}
        bg={isSelected ? '$gray11' : 'transparent'}
        opacity={isDisabled ? 0.2 : 1}
        borderWidth={isToday ? 3 : 0}
        borderColor="$gray6"
        rounded="$4"
      >
        <YStack items="center">
          <Text p={0} color={isSelected ? '$gray6' : '$gray12'}>
            {date.day}
          </Text>
          <DateCountDot
            dateCounts={dateCounts}
            dateString={date.dateString}
            isSelected={isSelected}
          />
        </YStack>
      </Button>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.date.dateString === nextProps.date.dateString &&
      prevProps.state === nextProps.state &&
      prevProps.marking === nextProps.marking
    );
  },
);
