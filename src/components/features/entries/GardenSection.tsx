import { useCallback, useMemo } from 'react'
import { ScrollView, XStack, YStack, styled } from 'tamagui'

import { MONTHS } from '@/constants'
import type { ISOMonthString, MonthKey } from '@/types'
import { DateUtils } from '@/utils'
import { GardenDayUnits } from './GardenDayUnits'
import { GardenTitleHeader } from './GardenTitleHeader'
import { MonthItem } from './MonthItem'

interface Props {
  onSelectedMonthChange: (month: ISOMonthString) => void
  selectedMonth: ISOMonthString
  selectedYear: number
  isSelectedMonth: (month: ISOMonthString) => boolean
}

export function GardenSection({
  onSelectedMonthChange,
  selectedYear,
  selectedMonth,
  isSelectedMonth,
}: Props) {
  const staticMonths = useMemo(
    () =>
      Object.keys(MONTHS).map((month, i) => ({
        monthKey: month as MonthKey,
        monthDate: DateUtils.getISOMonthString(selectedYear, i + 1),
        lastDate: DateUtils.getLastDateOfMonth(selectedYear, month as MonthKey),
        firstDateDay: DateUtils.getFirstDay(selectedYear, month),
        weekLength: DateUtils.getWeekLength(selectedYear, month),
      })),
    [],
  )

  const handleMonthPress = useCallback(
    (monthDate: ISOMonthString) => {
      onSelectedMonthChange(monthDate)
    },
    [selectedMonth, onSelectedMonthChange],
  )

  return (
    <Container>
      <GardenTitleHeader />
      <ScrollView horizontal>
        <GardenDayUnits />
        <GrassContainer>
          {staticMonths.map(staticMonth => (
            <MonthItem
              selectedMonth={selectedMonth}
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
