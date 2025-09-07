import { useCallback, useMemo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { MONTHS } from '@/src/constants'
import type { ISOMonthString, Journal, MonthKey } from '@/src/types'
import {
  getFirstDay,
  getISOMonthString,
  getLastDateOfMonth,
  getWeekLength,
} from '@/src/utils'
import { GardenDayUnits } from './GardenDayUnits'
import { GardenTitleHeader } from './GardenTitleHeader'
import { MonthItem } from './MonthItem'

interface Props {
  journals?: Journal[]
  onSelectedMonthChange: (month: ISOMonthString) => void
  selectedYear: number
  isSelectedMonth: (month: ISOMonthString) => boolean
}

export function Garden({
  journals,
  onSelectedMonthChange,
  selectedYear,
  isSelectedMonth,
}: Props) {
  const staticMonths = useMemo(
    () =>
      Object.keys(MONTHS).map((month, i) => ({
        monthKey: month as MonthKey,
        monthDate: getISOMonthString(selectedYear, i + 1),
        lastDate: getLastDateOfMonth(selectedYear, month as MonthKey),
        firstDateDay: getFirstDay(selectedYear, month),
        weekLength: getWeekLength(selectedYear, month),
      })),
    [selectedYear],
  )

  const handleMonthPress = useCallback(
    (monthDate: ISOMonthString) => {
      onSelectedMonthChange(monthDate)
    },
    [onSelectedMonthChange],
  )

  return (
    <View style={styles.container}>
      <GardenTitleHeader />
      <ScrollView horizontal>
        <GardenDayUnits />
        <View style={styles.grassBox}>
          {staticMonths.map(staticMonth => (
            <MonthItem
              journals={journals}
              key={staticMonth.monthKey}
              monthKey={staticMonth.monthKey}
              monthDate={staticMonth.monthDate}
              lastDate={staticMonth.lastDate}
              firstDateDay={staticMonth.firstDateDay}
              weekLength={staticMonth.weekLength}
              isSelected={isSelectedMonth(staticMonth.monthDate)}
              onMonthPress={handleMonthPress}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    gap: 4,
    padding: 16,
  },
  grassBox: {
    flexDirection: 'row',
    gap: 4,
  },
})
