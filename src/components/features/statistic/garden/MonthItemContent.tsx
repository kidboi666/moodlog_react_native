import { memo } from 'react'
import { YStack } from 'tamagui'

import type { ISOMonthString, Journal, MonthKey } from '@/types'
import { GardenContent } from './GardenContent'
import { GardenMonthUnits } from './GardenMonthUnits'

interface Props {
  journals?: Journal[]
  monthKey: MonthKey
  weekLength: number
  firstDateDay: number
  monthDate: ISOMonthString
  lastDate: number
}

function _MonthItemContent({
  journals,
  monthKey,
  weekLength,
  firstDateDay,
  monthDate,
  lastDate,
}: Props) {
  return (
    <YStack>
      <GardenMonthUnits month={monthKey} />
      <GardenContent
        journals={journals}
        weekLength={weekLength}
        firstDateDay={firstDateDay}
        monthDate={monthDate}
        lastDate={lastDate}
      />
    </YStack>
  )
}

export const MonthItemContent = memo(_MonthItemContent)

MonthItemContent.displayName = 'MonthItemContent'
