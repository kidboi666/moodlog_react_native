import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'

import {
  Garden,
  LogStreak,
  StartDay,
  TotalCount,
} from '@/components/features/statistic'
import { H1, ScreenView } from '@/components/shared'
import { useCalendar } from '@/hooks'
import { JournalQueries } from '@/queries'
import { ISOMonthString } from '@/types'

const AnimatedScreenView = Animated.createAnimatedComponent(ScreenView)
export default function StatisticScreen() {
  const {
    selectedYear,
    selectedMonth,
    todayString,
    isSelectedMonth,
    onSelectedMonthChange,
  } = useCalendar()
  const { t } = useTranslation()
  const { data: journals } = useQuery(
    JournalQueries.getJournalsByYear(selectedYear),
  )
  const monthString = selectedMonth
    ? selectedMonth
    : (todayString.substring(0, 7) as ISOMonthString)

  return (
    <AnimatedScreenView
      entering={FadeIn.duration(800)}
      edges={['top', 'bottom']}
      padded
      withScroll
      style={styles.container}
    >
      <View style={styles.titleBox}>
        <H1>{t('statistics.title')}</H1>
      </View>
      <View style={styles.contentBox}>
        <View style={styles.chartBox}>
          <TotalCount />
          <StartDay />
        </View>
        <LogStreak />
        <Garden
          journals={journals}
          selectedYear={selectedYear}
          isSelectedMonth={isSelectedMonth}
          onSelectedMonthChange={onSelectedMonthChange}
        />
      </View>
    </AnimatedScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  titleBox: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  contentBox: {
    gap: 12,
  },
  chartBox: {
    gap: 12,
  },
})
