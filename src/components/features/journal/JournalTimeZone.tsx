import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { useApp } from '@/store'
import { Journal, TimeFormat } from '@/types'

interface Props {
  journal?: Journal
}

export function JournalTimeZone({ journal }: Props) {
  const timeFormat = useApp(state => state.settings.timeFormat)
  if (!journal) return null
  const renderDate = () => {
    const [year, month, day] = journal.localDate.split('-')
    return `${year}. ${month}. ${day}.`
  }
  const renderTime = () => {
    const date = new Date(journal.createdAt)
    let timestamp: string
    if (timeFormat === TimeFormat.HOUR_12) {
      // 12시간제 형식 (AM/PM)
      const hours = date.getHours()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const hour12 = hours % 12 || 12 // 0시는 12시로 표시
      const minutes = String(date.getMinutes()).padStart(2, '0')
      timestamp = `${hour12}:${minutes} ${ampm}`
    } else {
      // 24시간제 형식 (기본값)
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      timestamp = `${hours}:${minutes}`
    }
    return timestamp
  }

  return (
    <View style={styles.timezoneBox}>
      <Text style={styles.text}>{renderDate()}</Text>
      <Text style={styles.text}>{renderTime()}</Text>
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
