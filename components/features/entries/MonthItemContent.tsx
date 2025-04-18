import { memo } from 'react'
import { YStack } from 'tamagui'

import { Garden } from '@/components/features/entries/Garden'
import { GardenMonthUnits } from '@/components/features/entries/GardenMonthUnits'
import type { ISODateString, ISOMonthString, MonthKey, Mood } from '@/types'

interface Props {
  monthKey: MonthKey
  weekLength: number
  firstDateDay: number
  monthDate: ISOMonthString
  lastDate: number
  getMoodForDate: (date: ISODateString) => Mood[]
}
export const MonthItemContent = memo(
  ({
    monthKey,
    weekLength,
    firstDateDay,
    monthDate,
    lastDate,
    getMoodForDate,
  }: Props) => {
    return (
      <YStack>
        <GardenMonthUnits month={monthKey} />
        <Garden
          weekLength={weekLength}
          firstDateDay={firstDateDay}
          monthDate={monthDate}
          lastDate={lastDate}
          getMoodForDate={getMoodForDate}
        />
      </YStack>
    )
  },
)
