import { useSuspenseQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import { XStack, YStack, styled } from 'tamagui'

import { JournalQueries } from '@/queries'
import { ISOMonthString, Maybe, TimeRange } from '@/types'
import { MoodUtils } from '@/utils'
import { Grass } from './Grass'

interface Props {
  selectedMonth: Maybe<ISOMonthString>
  weekLength: number
  firstDateDay: number
  monthDate: ISOMonthString
  lastDate: number
}

function _Garden({
  selectedMonth,
  weekLength,
  monthDate,
  firstDateDay,
  lastDate,
}: Props) {
  const { data: journals } = useSuspenseQuery(
    JournalQueries.getJournals(TimeRange.MONTHLY, selectedMonth),
  )
  const garden = useMemo(
    () =>
      MoodUtils.getGardenMoodData(
        journals,
        weekLength,
        firstDateDay,
        monthDate,
        lastDate,
      ),
    [journals, weekLength, firstDateDay, lastDate, monthDate],
  )

  return (
    <GardenContainer>
      {garden.map((week, weekIndex) => (
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
