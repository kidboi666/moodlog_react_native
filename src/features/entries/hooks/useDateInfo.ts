import type { ISODateString } from '@/src/shared/types'
import {
  getDateFromISODate,
  getDayFromISODate,
  getMonthKey,
} from '@/src/shared/utils'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export function useDateInfo(date: string) {
  const { t, i18n } = useTranslation()

  return useMemo(() => {
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
}
