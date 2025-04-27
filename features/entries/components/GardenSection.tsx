import { useCallback, useMemo } from 'react'
import { ScrollView, XStack, YStack, styled } from 'tamagui'

import { JournalUtils } from '@/features/journal/utils'
import { DelayMS, MONTHS } from '@/shared/constants'
import { useCalendar } from '@/shared/hooks'
import { useJournal } from '@/shared/store'
import type { ISOMonthString, MonthKey } from '@/shared/types'
import { DateUtils } from '@/shared/utils'
import { GardenDayUnits } from './GardenDayUnits'
import { GardenTitleHeader } from './GardenTitleHeader'
import { MonthItem } from './MonthItem'

export const GardenSection = () => {
  const selectJournals = useJournal(state => state.selectJournals)
  const store = useJournal(state => state.store)
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
        monthDate: DateUtils.getISOMonthString(selectedYear, i + 1),
        lastDate: DateUtils.getLastDate(selectedYear, month as MonthKey),
        firstDateDay: DateUtils.getFirstDateDay(selectedYear, month),
        weekLength: DateUtils.getWeekLength(selectedYear, month),
      })),
    [selectedYear],
  )

  const handleMonthPress = useCallback(
    (monthDate: ISOMonthString) => {
      const { journals, indexes } = store
      const selectedJournals = JournalUtils.getJournals(
        { journals, indexes },
        monthDate,
      )
      onSelectedMonthChange(selectedMonth === monthDate ? null : monthDate)

      setTimeout(() => {
        selectJournals(selectedMonth === monthDate ? null : selectedJournals)
      }, DelayMS.ANIMATION.LONG[0])
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
              monthKey={staticMonth.monthKey}
              monthDate={staticMonth.monthDate}
              lastDate={staticMonth.lastDate}
              firstDateDay={staticMonth.firstDateDay}
              weekLength={staticMonth.weekLength}
              isSelected={isSelectedMonth(staticMonth.monthDate)}
              onMonthPress={handleMonthPress}
            />
          ))}
        </StackBox>
      </ScrollView>
    </Container>
  )
}

const Container = styled(YStack, {
  bg: '$gray4',
  p: '$4',
  rounded: '$8',
  gap: '$4',
})

const StackBox = styled(XStack, {
  gap: '$2',
})
