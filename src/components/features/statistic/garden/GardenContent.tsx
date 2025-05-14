import { memo, useMemo } from 'react'
import { XStack, YStack, styled } from 'tamagui'

import { ISOMonthString, Journal } from '@/types'
import { getGardenMoodData } from '@/utils'
import { Grass } from './Grass'

interface Props {
  weekLength: number
  firstDateDay: number
  monthDate: ISOMonthString
  lastDate: number
  journals: Journal[]
}

function _GardenContent({
  weekLength,
  monthDate,
  firstDateDay,
  lastDate,
  journals,
}: Props) {
  const garden = useMemo(
    () =>
      getGardenMoodData(
        weekLength,
        firstDateDay,
        monthDate,
        lastDate,
        journals,
      ),
    [journals, weekLength, firstDateDay, lastDate, monthDate],
  )

  return (
    <GardenContainer>
      {garden.map((week, weekIndex) => (
        <YStackContainer key={`${weekIndex}-${week}`}>
          {week.map((moodColor, dayIndex) => (
            <Grass key={`${dayIndex}-${moodColor}`} moodColor={moodColor} />
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

export const GardenContent = memo(_GardenContent)
GardenContent.displayName = 'Garden'
