import { useCallback, useMemo } from 'react'
import { ScrollView } from 'tamagui'

import { MONTHS } from '@/constants'
import { useCalendar } from '@/hooks'
import { useJournal } from '@/store'
import type { ISOMonthString, MonthKey } from '@/types'
import { getFirstDateDay, getLastDate, getWeekLength } from '@/utils'

import { GardenDayUnits } from '@/components/features/entries/GardenDayUnits'
import { GardenTitleHeader } from '@/components/features/entries/GardenTitleHeader'
import { MonthItem } from '@/components/features/entries/MonthItem'
import * as S from './GardenSection.styled'

export const GardenSection = () => {
  const { getMoodForDate, selectJournals } = useJournal()
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
    <S.Container>
      <GardenTitleHeader />
      <ScrollView horizontal>
        <GardenDayUnits />
        <S.StackBox>
          {staticMonths.map(staticMonth => (
            <MonthItem
              key={staticMonth.monthKey}
              monthData={staticMonth}
              isSelected={isSelectedMonth(staticMonth.monthDate)}
              onMonthChange={handleMonthChange}
              getMoodForDate={getMoodForDate}
            />
          ))}
        </S.StackBox>
      </ScrollView>
    </S.Container>
  )
}
