import { Button, View, styled } from 'tamagui'

import { Layout } from '@/constants'
import { DateCountDot } from './DateCountDot'
import { DayAndDate } from './DayAndDate'

interface Props {
  selected: boolean
  today: boolean
  onPress: () => void
  futureDateColor: '$color6' | '$color11' | '$color12'
  date: `${number}-${number}-${number}`
  journalCount: number
}

export function HorizontalCalendarContent({
  selected,
  today,
  onPress,
  futureDateColor,
  date,
  journalCount,
}: Props) {
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

const DateContainer = styled(View, {
  py: '$3',
  width: Layout.SPACE.CALENDAR_SCROLL_SIZE,
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
