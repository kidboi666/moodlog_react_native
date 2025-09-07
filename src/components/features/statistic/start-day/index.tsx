import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { H2, H3 } from '@/src/components/shared'
import { Layout } from '@/src/constants'
import { useAuth } from '@/src/store'
import { getDaysSinceSignup } from '@/src/utils'

export function StartDay() {
  const { t } = useTranslation()
  const session = useAuth(state => state.session)
  const createdAt = session?.user?.created_at || ''
  const daysSinceSignup = getDaysSinceSignup(createdAt)

  return (
    <View style={styles.container}>
      <H3>{t('statistics.daysSinceSignup.title')}</H3>
      <Text>{t('statistics.daysSinceSignup.description')}</Text>
      <View style={styles.content}>
        <H2>{daysSinceSignup}</H2>
        <Text style={styles.unit}>{t('statistics.daysSinceSignup.unit')}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 24,
    gap: 4,
    padding: 12,
    height: Layout.HEIGHT.RECORD_CARD_HEIGHT,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  unit: {
    lineHeight: Layout.HEIGHT.RECORD_UNIT_LINE_HEIGHT,
  },
})
