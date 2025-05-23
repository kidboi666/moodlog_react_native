import { StyleSheet, View } from 'react-native'
import { ProgressBar, Text } from 'react-native-paper'

import { H3 } from '@/components/shared'
import { useMood } from '@/store'

interface Props {
  moodScore: number
  moodId: string
  moodColor: string
}

export function ProgressGraph({ moodScore, moodId, moodColor }: Props) {
  const moods = useMood(state => state.moods)
  const mood = moods[moodId]

  return (
    <View style={styles.container}>
      <View style={styles.graphNameBox}>
        <H3>{mood?.name || moodId}</H3>
        <Text>{`${Math.floor(moodScore)}%`}</Text>
      </View>
      <ProgressBar progress={moodScore} color={moodColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  graphNameBox: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
})
