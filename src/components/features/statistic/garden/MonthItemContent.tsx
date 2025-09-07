import { memo } from 'react'
import { View } from 'react-native'

import type { ISOMonthString, Journal, MonthKey } from '@/src/types'
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
    <View>
      <GardenMonthUnits month={monthKey} />
      <GardenContent
        journals={journals}
        weekLength={weekLength}
        firstDateDay={firstDateDay}
        monthDate={monthDate}
        lastDate={lastDate}
      />
    </View>
  )
}

export const MonthItemContent = memo(_MonthItemContent)

MonthItemContent.displayName = 'MonthItemContent'
