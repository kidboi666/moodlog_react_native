import { memo } from 'react'
import { Button, styled } from 'tamagui'

import type { ISOMonthString, Journal, MonthKey } from '@/types'
import { MonthItemContent } from './MonthItemContent'

interface Props {
  journals?: Journal[]
  monthKey: MonthKey
  lastDate: number
  monthDate: ISOMonthString
  firstDateDay: number
  weekLength: number
  isSelected: boolean
  onMonthPress: (monthDate: ISOMonthString) => void
}

function _MonthItem({
  journals,
  monthKey,
  monthDate,
  lastDate,
  firstDateDay,
  weekLength,
  isSelected,
  onMonthPress,
}: Props) {
  return (
    <MonthItemButton
      key={monthKey}
      isSelected={isSelected}
      onPress={() => onMonthPress(monthDate)}
    >
      <MonthItemContent
        journals={journals}
        monthKey={monthKey}
        weekLength={weekLength}
        firstDateDay={firstDateDay}
        monthDate={monthDate}
        lastDate={lastDate}
      />
    </MonthItemButton>
  )
}

const MonthItemButton = styled(Button, {
  unstyled: true,
  rounded: '$8',
  py: '$4',
  scale: 1,
  opacity: 0.4,
  position: 'relative',
  animation: 'quick',
  animateOnly: ['opacity'],

  variants: {
    isSelected: {
      true: {
        opacity: 1,
      },
    },
  } as const,
})

export const MonthItem = memo(_MonthItem)

MonthItem.displayName = 'MonthItem'
