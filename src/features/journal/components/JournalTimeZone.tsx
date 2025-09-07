import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { useJournalDateTime } from '@/src/features/journal/hooks'

interface Props {
  journalId: number
}

export function JournalTimeZone({ journalId }: Props) {
  const { date, time } = useJournalDateTime(journalId)

  return (
    <View style={styles.timezoneBox}>
      <Text style={styles.text}>{date}</Text>
      <Text style={styles.text}>{time}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  timezoneBox: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontWeight: 800,
  },
})
