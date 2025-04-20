import { Button, View, styled } from 'tamagui'

import { CALENDAR_SCROLL_SIZE } from '@/constants'

import { DateCountDot, DayAndDate } from '@/components/features/home'

const DateContainer = styled(View, {
  py: '$3',
  width: CALENDAR_SCROLL_SIZE,
  rounded: '$4',
  borderColor: '$gray1',

  variants: {
    isSelected: {
      true: {
        bg: '$gray5',
      },
    },
    isToday: {
      true: {
        borderWidth: 1,
      },
    },
  } as const,
})

const DateWrapper = styled(Button, {
  unstyled: true,
  items: 'center',
})

interface Props {
  selected: boolean
  today: boolean
  onPress: () => void
  futureDateColor: '$color6' | '$color11' | '$color12'
  date: `${number}-${number}-${number}`
  journalCount: number
}

export const HorizontalCalendarContent = ({
  selected,
  today,
  onPress,
  futureDateColor,
  date,
  journalCount,
}: Props) => {
  return (
    <DateContainer isSelected={selected} isToday={today} onPress={onPress}>
      <DateWrapper>
        <DayAndDate
          selected={selected}
          futureDateColor={futureDateColor}
          date={date}
        />
        <DateCountDot
          variant='contained'
          journalCount={journalCount}
          isSelected={selected}
        />
      </DateWrapper>
    </DateContainer>
  )
}
