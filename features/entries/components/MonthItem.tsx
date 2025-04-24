import { memo } from 'react'
import { Button, styled } from 'tamagui'

import type { ISOMonthString, MonthKey } from 'shared/types'

import { MonthItemContent } from '@/features/entries/components/MonthItemContent'

export const MonthItemButton = styled(Button, {
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

interface Props {
  monthData: {
    monthKey: MonthKey
    lastDate: number
    monthDate: ISOMonthString
    firstDateDay: number
    weekLength: number
  }
  isSelected: boolean
  onMonthChange: (monthDate: ISOMonthString) => void
}

export const MonthItem = memo(
  ({ monthData, isSelected, onMonthChange }: Props) => {
    const { monthKey, monthDate, lastDate, firstDateDay, weekLength } =
      monthData
    return (
      <MonthItemButton
        key={monthKey}
        isSelected={isSelected}
        onPress={() => onMonthChange(monthDate)}
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
  (prevProps, nextProps) => {
    return (
      prevProps.monthData.monthKey === nextProps.monthData.monthKey &&
      prevProps.monthData.monthDate === nextProps.monthData.monthDate &&
      prevProps.monthData.firstDateDay === nextProps.monthData.firstDateDay &&
      prevProps.monthData.weekLength === nextProps.monthData.weekLength &&
      prevProps.monthData.lastDate === nextProps.monthData.lastDate &&
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.onMonthChange === nextProps.onMonthChange
    )
  },
)
