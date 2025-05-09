import { useCallback, useMemo } from 'react'
import { ScrollView, XStack, YStack, styled } from 'tamagui'

import { MONTHS } from '@/constants'
import type { ISOMonthString, Maybe, MonthKey } from '@/types'
import { DateUtils, JournalUtils } from '@/utils'
import { GardenDayUnits } from './GardenDayUnits'
import { GardenTitleHeader } from './GardenTitleHeader'
import { MonthItem } from './MonthItem'

interface Props {
  onSelectedMonthChange: (month: Maybe<ISOMonthString>) => void
  selectedMonth: Maybe<ISOMonthString>
  isSelectedMonth: (month: ISOMonthString) => boolean
}

export const GardenSection = ({
  onSelectedMonthChange,
  selectedMonth,
  isSelectedMonth,
}: Props) => {
  const staticMonths = useMemo(
    () =>
      Object.keys(MONTHS).map((month, i) => ({
        monthKey: month as MonthKey,
        monthDate: DateUtils.getISOMonthString(selectedYear, i + 1),
        lastDate: DateUtils.getLastDate(selectedYear, month as MonthKey),
        firstDateDay: DateUtils.getFirstDateDay(selectedYear, month),
        weekLength: DateUtils.getWeekLength(selectedYear, month),
      })),
    [],
  )

  const handleMonthPress = useCallback(
    (monthDate: ISOMonthString) => {
      const { journals, indexes } = store
      const selectedJournals = JournalUtils.getJournals(
        { journals, indexes },
        monthDate,
      )
      onSelectedMonthChange(selectedMonth === monthDate ? null : monthDate)
      selectJournals(selectedMonth === monthDate ? null : selectedJournals)
    },
    [selectedMonth, onSelectedMonthChange, selectJournals],
  )

  return (
    <Container>
      <GardenTitleHeader />
      <ScrollView horizontal>
        <GardenDayUnits />
        <GrassContainer>
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
        </GrassContainer>
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

const GrassContainer = styled(XStack, {
  gap: '$2',
})
