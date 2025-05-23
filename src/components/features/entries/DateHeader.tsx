import { useThemedStyles } from '@/hooks'
import type { ISODateString } from '@/types'
import { getDateFromISODate, getDayFromISODate, getMonthKey } from '@/utils'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Divider, Text } from 'react-native-paper'

interface DateHeaderProps {
  date: string
}

export function DateHeader({ date }: DateHeaderProps) {
  const { t, i18n } = useTranslation()
  const dateInfo = useMemo(() => {
    const dateObj = new Date(date)
    const dayOfMonth = getDateFromISODate(date as ISODateString)
    const monthKey = getMonthKey(dateObj.getMonth())
    const weekdayKey = getDayFromISODate(date as ISODateString)

    return {
      day: String(dayOfMonth),
      month: t(`calendar.months.${monthKey}`),
      weekday: t(`calendar.days.${weekdayKey}`),
      fullDate: dateObj.toLocaleDateString(i18n.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    }
  }, [date, i18n.language])

  const themedStyles = useThemedStyles(({ colors }) => ({
    dateCircle: {
      backgroundColor: colors.background.primary,
    },
  }))
  return (
    <View style={styles.container}>
      <View style={[styles.dateCircle, themedStyles.dateCircle]}>
        <View style={styles.circleInner}>
          <Text variant='titleMedium'>{dateInfo.day}</Text>
          <Text variant='titleSmall'>{dateInfo.weekday}</Text>
        </View>
      </View>
      <Text variant='titleLarge'>{dateInfo.month}</Text>
      <Divider bold style={styles.divider} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 12,
    paddingHorizontal: 4,
    gap: 8,
  },
  divider: { flex: 1 },
  dateCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  circleInner: {
    flexDirection: 'column',
    alignItems: 'center',
  },
})
