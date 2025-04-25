import { useCallback, useMemo } from 'react'
import { ScrollView, XStack, YStack, styled } from 'tamagui'

import { MONTHS } from '@/shared/constants'
import { useCalendar } from '@/shared/hooks'
import type { ISOMonthString, MonthKey } from '@/shared/types'
import { getFirstDateDay, getLastDate, getWeekLength } from '@/shared/utils'
import { useJournal } from 'shared/store'

import { GardenDayUnits } from './GardenDayUnits'
import { GardenTitleHeader } from './GardenTitleHeader'
import { MonthItem } from './MonthItem'

const Container = styled(YStack, {
  bg: '$gray4',
  p: '$4',
  rounded: '$8',
  gap: '$4',
})

const StackBox = styled(XStack, {
  gap: '$2',
})

export const GardenSection = () => {
  const selectJournals = useJournal(state => state.selectJournals)
  const {
    selectedYear,
    selectedMonth,
    onSelectedMonthChange,
    isSelectedMonth,
  } = useCalendar()

  const staticMonths = useMemo(
    () =>
      Object.keys(MONTHS).map((month, i) => ({
        monthKey: month as MonthKey,
        monthDate:
          `${selectedYear}-${(i + 1).toString().padStart(2, '0')}` as ISOMonthString,
        lastDate: getLastDate(selectedYear, month as MonthKey),
        firstDateDay: getFirstDateDay(selectedYear, month),
        weekLength: getWeekLength(selectedYear, month),
      })),
    [selectedYear],
  )

  const handleMonthChange = useCallback(
    (monthDate: ISOMonthString) => {
      onSelectedMonthChange(selectedMonth === monthDate ? null : monthDate)

      setTimeout(() => {
        selectJournals(selectedMonth === monthDate ? null : monthDate)
      }, 0)
    },
    [selectedMonth, onSelectedMonthChange, selectJournals],
  )

  return (
    <Container>
      <GardenTitleHeader />
      <ScrollView horizontal>
        <GardenDayUnits />
        <StackBox>
          {staticMonths.map(staticMonth => (
            <MonthItem
              key={staticMonth.monthKey}
              monthData={staticMonth}
              isSelected={isSelectedMonth(staticMonth.monthDate)}
              onMonthChange={handleMonthChange}
            />
          ))}
        </StackBox>
      </ScrollView>
    </Container>
  )
}
