import { memo, useMemo } from 'react'
import { XStack, YStack, styled } from 'tamagui'

import type { ISOMonthString } from '@/types'
import { MoodUtils } from '@/utils'
import { Grass } from './Grass'

interface Props {
  weekLength: number
  firstDateDay: number
  monthDate: ISOMonthString
  lastDate: number
}

function _Garden({ weekLength, monthDate, firstDateDay, lastDate }: Props) {
  const moodData = useMemo(
    () =>
      MoodUtils.getGardenMoodData(
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
}

const GardenContainer = styled(XStack, {
  gap: '$2',
})

const YStackContainer = styled(YStack, {
  gap: '$2',
})

export const Garden = memo(_Garden)

Garden.displayName = 'Garden'
