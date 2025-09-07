import { useQuery } from '@tanstack/react-query'
import { Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { H2, H3 } from '@/src/components/shared'
import { Layout } from '@/src/constants'
import { StatisticQueries } from '@/src/queries'
import { useTranslation } from 'react-i18next'

export function TotalCount() {
  const { t } = useTranslation()
  const { data: totalCount } = useQuery(StatisticQueries.getTotalCount())

  return (
    <Pressable style={styles.container}>
      <View style={styles.headerBox}>
        <H3>{t('statistics.totalCount.title')}</H3>
        <Text>{t('statistics.totalCount.description')}</Text>
      </View>
      <View style={styles.contentBox}>
        <H2>{totalCount}</H2>
        <Text style={styles.unit}>{t('common.units.count')}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 24,
    padding: 16,
    height: Layout.HEIGHT.RECORD_CARD_HEIGHT,
  },
  headerBox: {
    gap: 4,
  },
  contentBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    flex: 1,
  },
  unit: {
    lineHeight: Layout.HEIGHT.RECORD_UNIT_LINE_HEIGHT,
  },
})
