import { memo } from 'react'
import { YStack } from 'tamagui'

import { Garden } from '@/features/entries/components/Garden'
import { GardenMonthUnits } from '@/features/entries/components/GardenMonthUnits'
import type { ISOMonthString, MonthKey } from 'shared/types'

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
