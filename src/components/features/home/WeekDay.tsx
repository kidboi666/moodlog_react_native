import { useQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { GradientBox, H1 } from '@/components/shared'
import { DelayMS } from '@/constants'
import { JournalQueries } from '@/queries'
import { ISODateString } from '@/types'
import { getCountForDate, getISOMonthString, getMonthKey } from '@/utils'
import { HorizontalCalendar } from './calendar/HorizontalCalendar'

interface Props {
  selectedDate: ISODateString
  onSelectedDateChange: (date: ISODateString) => void
}

function _WeekDay({ selectedDate, onSelectedDateChange }: Props) {
  const theme = useTheme()
  const { t } = useTranslation()
  const { data: monthlyJournals } = useQuery(
    JournalQueries.getJournalsByMonth(getISOMonthString(selectedDate)),
  )
  const dateCount = useMemo(
    () => monthlyJournals && getCountForDate(monthlyJournals),
    [monthlyJournals],
  )

  return (
    <Animated.View entering={FadeIn.delay(DelayMS.ANIMATION.MEDIUM[1])}>
      <GradientBox>
        <View style={styles.monthBox}>
          <H1 style={{ color: theme.colors.surface }}>
            {t(`calendar.months.${getMonthKey(new Date().getMonth())}`)}.
          </H1>
        </View>
        <HorizontalCalendar
          selectedDate={selectedDate}
          onSelectedDateChange={onSelectedDateChange}
          dateCount={dateCount}
        />
      </GradientBox>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  monthBox: {
    justifyContent: 'center',
  },
})

export const WeekDay = memo(_WeekDay)
WeekDay.displayName = 'WeekDay'
