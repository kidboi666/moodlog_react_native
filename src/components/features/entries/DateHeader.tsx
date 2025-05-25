import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Divider, Surface, Text, useTheme } from 'react-native-paper'

import { H3, H4, H5, H6 } from '@/components/shared'
import type { ISODateString } from '@/types'
import { getDateFromISODate, getDayFromISODate, getMonthKey } from '@/utils'

interface DateHeaderProps {
  date: string
}

export function DateHeader({ date }: DateHeaderProps) {
  const theme = useTheme()
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

  return (
    <View style={styles.container}>
      <H4 style={{ color: theme.colors.onPrimaryContainer }}>
        {dateInfo.day}.
      </H4>
      <Text style={{ color: theme.colors.onSurface }}>{dateInfo.weekday}</Text>
      <Divider style={styles.divider} />
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
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
})
