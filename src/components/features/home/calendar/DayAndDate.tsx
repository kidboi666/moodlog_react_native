import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { getDateFromISODate, getDayFromISODate } from '@/utils'

interface DayAndDateProps {
  futureDateColor: string
  date: `${number}-${number}-${number}`
}

export function DayAndDate({ futureDateColor, date }: DayAndDateProps) {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <Text style={[styles.day, { color: futureDateColor }]}>
        {t(`calendar.days.${getDayFromISODate(date)}`)}
      </Text>
      <Text style={[{ color: futureDateColor }]}>
        {getDateFromISODate(date)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    alignItems: 'center',
  },
  day: {
    fontWeight: '800',
  },
})
