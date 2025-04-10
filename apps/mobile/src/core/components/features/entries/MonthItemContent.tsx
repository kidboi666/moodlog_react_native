import { memo } from 'react'
import { YStack } from 'tamagui'

import { Garden } from '@/core/components/features/entries/Garden'
import { GardenMonthUnits } from '@/core/components/features/entries/GardenMonthUnits'
import type {
  ISODateString,
  ISOMonthString,
  MonthKey,
} from '@/types/date.types'
import type { Mood } from '@/types/mood.types'

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
