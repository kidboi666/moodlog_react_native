import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { H5, IconButton } from '@/src/components/shared'
import { useAuth } from '@/src/store'
import type { ExpressiveMonthStats } from '@/src/types'
import { getDaysSinceSignup, getMonthKey } from '@/src/utils'

interface Props {
  frequency: number
  activeDay: string
  totalCount: number
  expressiveMonth: ExpressiveMonthStats
}

function _TotalCountExpandedContent({
  frequency,
  activeDay,
  totalCount,
  expressiveMonth,
}: Props) {
  const session = useAuth(state => state.session)
  const { t } = useTranslation()

  if (!session) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.gapBox}>
        <H5>{t('statistics.totalCount.daysSinceSignup.title')}</H5>
        <Text>
          {t('statistics.totalCount.daysSinceSignup.description', {
            date: getDaysSinceSignup(session.user.created_at),
          })}
        </Text>
      </View>
      <View style={styles.gapBox}>
        <H5>{t('statistics.totalCount.frequency.title')}</H5>
        <Text>
          {frequency === 0
            ? t('statistics.totalCount.frequency.everyDay')
            : t('statistics.totalCount.frequency.description', {
                date: frequency,
              })}
        </Text>
      </View>
      <View style={styles.gapBox}>
        <H5>{t('statistics.totalCount.mostDay.title')}</H5>
        <Text>
          {t('statistics.totalCount.mostDay.description', {
            day: t(`calendar.days.${activeDay}`),
          })}
        </Text>
      </View>
      <View style={styles.gapBox}>
        <H5>{t('statistics.totalCount.expressiveMonth.title')}</H5>
        <Text>
          {t('statistics.totalCount.expressiveMonth.description', {
            month: t(`calendar.months.${getMonthKey(expressiveMonth.month)}`),
            count: expressiveMonth.count,
          })}
        </Text>
      </View>
      <IconButton icon='minimize-2' disabled />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  gapBox: {
    gap: 4,
  },
})

export const TotalCountExpandedContent = memo(_TotalCountExpandedContent)

TotalCountExpandedContent.displayName = 'TotalCountExpandedContent'
