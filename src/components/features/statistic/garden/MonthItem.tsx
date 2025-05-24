import { memo } from 'react'
import { Pressable, StyleSheet } from 'react-native'

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
    <Pressable
      key={monthKey}
      style={[
        styles.container,
        {
          opacity: isSelected ? 1 : 0.4,
        },
      ]}
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
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    paddingVertical: 16,
    position: 'relative',
  },
})

export const MonthItem = memo(_MonthItem)

MonthItem.displayName = 'MonthItem'
