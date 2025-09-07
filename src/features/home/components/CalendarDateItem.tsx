import { Pressable, StyleSheet, View } from 'react-native'

import { LAYOUT } from '@/src/shared/constants'
import { getDateFromISODate, getDayFromISODate } from '@/src/shared/utils'
import { useTranslation } from 'react-i18next'
import { Text, useTheme } from 'react-native-paper'

interface Props {
  selected: boolean
  today: boolean
  onPress: () => void
  futureDateColor: string
  date: `${number}-${number}-${number}`
  journalCount: number
}

export function CalendarDateItem({
  selected,
  today,
  onPress,
  futureDateColor,
  date,
  journalCount,
}: Props) {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <Pressable
      style={[
        styles.container,
        selected ? { backgroundColor: theme.colors.surfaceVariant } : undefined,
        today ? { borderWidth: 1 } : undefined,
      ]}
      onPress={onPress}
    >
      <View style={styles.dateContainer}>
        <Text style={[styles.day, { color: futureDateColor }]}>
          {t(`calendar.days.${getDayFromISODate(date)}`)}
        </Text>
        <Text style={[{ color: futureDateColor }]}>
          {getDateFromISODate(date)}
        </Text>

        {/* Journal count indicator */}
        {journalCount > 0 && (
          <View
            style={[
              styles.indicator,
              { backgroundColor: theme.colors.primary },
            ]}
          />
        )}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    width: LAYOUT.SPACE.CALENDAR_DATE_ITEM,
    borderRadius: 16,
  },
  dateContainer: {
    gap: 4,
    alignItems: 'center',
  },
  day: {
    fontWeight: '800',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 2,
  },
})
