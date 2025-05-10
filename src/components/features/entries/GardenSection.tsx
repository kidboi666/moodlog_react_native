import { useCallback, useMemo } from 'react'
import { ScrollView, XStack, YStack, styled } from 'tamagui'

import { MONTHS } from '@/constants'
import type { ISOMonthString, Maybe, MonthKey } from '@/types'
import { DateUtils } from '@/utils'
import { GardenDayUnits } from './GardenDayUnits'
import { GardenTitleHeader } from './GardenTitleHeader'
import { MonthItem } from './MonthItem'

interface Props {
  onSelectedMonthChange: (month: Maybe<ISOMonthString>) => void
  selectedMonth: Maybe<ISOMonthString>
  isSelectedMonth: (month: ISOMonthString) => boolean
}

export function GardenSection({
  onSelectedMonthChange,
  selectedMonth,
  isSelectedMonth,
}: Props) {
  const now = new Date()
  const currentYear = now.getFullYear()

  const staticMonths = useMemo(
    () =>
      Object.keys(MONTHS).map((month, i) => ({
        monthKey: month as MonthKey,
        monthDate: DateUtils.getISOMonthString(currentYear, i + 1),
        lastDate: DateUtils.getLastDate(currentYear, month as MonthKey),
        firstDateDay: DateUtils.getFirstDateDay(currentYear, month),
        weekLength: DateUtils.getWeekLength(currentYear, month),
      })),
    [],
  )

  const handleMonthPress = useCallback(
    (monthDate: ISOMonthString) => {
      onSelectedMonthChange(selectedMonth === monthDate ? null : monthDate)
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
