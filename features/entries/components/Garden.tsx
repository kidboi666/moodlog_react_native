import { memo, useMemo } from 'react'
import { XStack, YStack, styled } from 'tamagui'

import { JournalUtils } from '@/features/journal/utils'
import { MoodUtils } from '@/features/mood/utils'
import { useJournal } from '@/shared/store'
import type { ISOMonthString } from '@/shared/types'
import { DateUtils } from '@/shared/utils'
import { Grass } from './Grass'

interface Props {
  weekLength: number
  firstDateDay: number
  monthDate: ISOMonthString
  lastDate: number
}

export const Garden = memo(
  ({ weekLength, monthDate, firstDateDay, lastDate }: Props) => {
    const store = useJournal(state => state.store)
    const moodData = useMemo(
      () =>
        MoodUtils.getGardenMoodData(
          store,
          weekLength,
          firstDateDay,
          monthDate,
          lastDate,
        ),
      [weekLength, firstDateDay, lastDate, monthDate],
    )

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

const GardenContainer = styled(XStack, {
  gap: '$2',
})

const YStackContainer = styled(YStack, {
  gap: '$2',
})
