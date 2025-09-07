import { memo, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import { ISOMonthString, Journal } from '@/src/types'
import { getGardenMoodData } from '@/src/utils'
import { Grass } from './Grass'

interface Props {
  weekLength: number
  firstDateDay: number
  monthDate: ISOMonthString
  lastDate: number
  journals?: Journal[]
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
    <View style={styles.container}>
      {garden.map((week, weekIndex) => (
        <View style={styles.grassBox} key={`${weekIndex}-${week}`}>
          {week.map((moodColor, dayIndex) => (
            <Grass key={`${dayIndex}-${moodColor}`} moodColor={moodColor} />
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
  },
  grassBox: {
    gap: 4,
  },
})

export const GardenContent = memo(_GardenContent)
GardenContent.displayName = 'Garden'
