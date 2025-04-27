import { memo } from 'react'
import { Button, styled } from 'tamagui'

import type { ISOMonthString, MonthKey } from '@/shared/types'
import { MonthItemContent } from './MonthItemContent'

interface Props {
  monthKey: MonthKey
  lastDate: number
  monthDate: ISOMonthString
  firstDateDay: number
  weekLength: number
  isSelected: boolean
  onMonthPress: (monthDate: ISOMonthString) => void
}

export const MonthItem = memo(
  ({
    monthKey,
    monthDate,
    lastDate,
    firstDateDay,
    weekLength,
    isSelected,
    onMonthPress,
  }: Props) => {
    return (
      <MonthItemButton
        key={monthKey}
        isSelected={isSelected}
        onPress={() => onMonthPress(monthDate)}
      >
        <MonthItemContent
          monthKey={monthKey}
          weekLength={weekLength}
          firstDateDay={firstDateDay}
          monthDate={monthDate}
          lastDate={lastDate}
        />
      </MonthItemButton>
    )
  },
)

const MonthItemButton = styled(Button, {
  unstyled: true,
  rounded: '$8',
  py: '$4',
  scale: 1,
  opacity: 0.4,
  position: 'relative',
  animation: 'lazy',
  animateOnly: ['opacity'],

  variants: {
    isSelected: {
      true: {
        opacity: 1,
      },
    },
  } as const,
})
