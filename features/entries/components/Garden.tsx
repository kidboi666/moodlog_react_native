import { memo, useMemo } from 'react'
import { XStack, YStack, styled } from 'tamagui'

import { JournalUtils } from '@/features/journal/utils'
import { useJournal } from '@/shared/store'
import type { ISOMonthString } from '@/shared/types'
import { DateUtils } from '@/shared/utils'
import { Grass } from './Grass'

const GardenContainer = styled(XStack, {
  gap: '$2',
})

const YStackContainer = styled(YStack, {
  gap: '$2',
})

interface Props {
  weekLength: number
  firstDateDay: number
  monthDate: ISOMonthString
  lastDate: number
}

export const Garden = memo(
  ({ weekLength, monthDate, firstDateDay, lastDate }: Props) => {
    const store = useJournal(state => state.store)
    const moodData = useMemo(() => {
      const data = []

      for (let week = 0; week < weekLength; week++) {
        const weekData = []
        for (let day = 0; day < 7; day++) {
          const dateNum = week * 7 + day - firstDateDay + 1
          if (dateNum <= 0 || dateNum > lastDate) {
            weekData.push(null)
          } else {
            const dateString = DateUtils.getISODateFromMonthString(
              monthDate,
              dateNum,
            )
            weekData.push(JournalUtils.getMoodForDate(store, dateString))
          }
        }
        data.push(weekData)
      }

      return data
    }, [weekLength, firstDateDay, lastDate, monthDate])
    return (
      <GardenContainer>
        {moodData.map((week, weekIndex) => (
          <YStackContainer key={`${weekIndex}-${week}`}>
            {week.map((moods, dayIndex) => (
              <Grass
                key={`${dayIndex}-${moods}`}
                mood={moods}
                isEmpty={moods === null}
              />
            ))}
          </YStackContainer>
        ))}
      </GardenContainer>
    )
  },
)
