import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { useThemedStyles } from '@/hooks'
import { getDateFromISODate, getDayFromISODate } from '@/utils'

interface DayAndDateProps {
  futureDateColor: string
  date: `${number}-${number}-${number}`
}

export function DayAndDate({ futureDateColor, date }: DayAndDateProps) {
  const { t } = useTranslation()
  const themedStyles = useThemedStyles(() => ({
    text: {
      color: futureDateColor,
    },
  }))
  return (
    <View style={styles.container}>
      <Text style={themedStyles.text}>
        {t(`calendar.days.${getDayFromISODate(date)}`)}
      </Text>
      <Text style={themedStyles.text}>{getDateFromISODate(date)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    alignItems: 'center',
  },
})
