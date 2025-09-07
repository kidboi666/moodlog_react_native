import { DELAY_MS, LAYOUT } from '@/src/shared/constants'
import { ISODateString, Maybe } from '@/src/shared/types'
import { getDateFromISODate, getDayIndexFromISODate } from '@/src/shared/utils'
import { useEffect, useRef } from 'react'
import { ScrollView } from 'react-native'

export function useScrollToToday(
  dates: Record<`${number}-${number}-${number}`, number>,
  selectedDate: Maybe<ISODateString>,
) {
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    let timeout: number

    if (selectedDate) {
      const selectedIndex = getDateFromISODate(selectedDate)
      const day = getDayIndexFromISODate(selectedDate) || 7

      timeout = setTimeout(() => {
        if (selectedIndex !== -1 && scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: (selectedIndex - day) * LAYOUT.SPACE.CALENDAR_DATE_ITEM,
            animated: true,
          })
        }
      }, DELAY_MS.ANIMATION.LONG)
    }

    return () => clearTimeout(timeout)
  }, [dates, selectedDate])

  return { scrollViewRef }
}
