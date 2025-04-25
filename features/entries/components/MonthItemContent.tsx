import { memo } from 'react'
import { YStack } from 'tamagui'

import type { ISOMonthString, MonthKey } from '@/shared/types'

import { Garden } from './Garden'
import { GardenMonthUnits } from './GardenMonthUnits'

interface Props {
  monthKey: MonthKey
  weekLength: number
  firstDateDay: number
  monthDate: ISOMonthString
  lastDate: number
}

export const MonthItemContent = memo(
  ({ monthKey, weekLength, firstDateDay, monthDate, lastDate }: Props) => {
    return (
      <YStack>
        <GardenMonthUnits month={monthKey} />
        <Garden
          weekLength={weekLength}
          firstDateDay={firstDateDay}
          monthDate={monthDate}
          lastDate={lastDate}
        />
      </YStack>
    )
  },
)
