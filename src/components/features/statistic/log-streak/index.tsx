import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { BaseText, H2, H3 } from '@/components/shared'
import { Layout } from '@/constants'
import { DayBox } from './DayBox'

export function LogStreak() {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <H3>{t('statistics.logStreakDay.title')}</H3>
        <Text>{t('statistics.logStreakDay.description')}</Text>
      </View>
      <View style={styles.descriptionBox}>
        <H2>32</H2>
        <Unit>{t('statistics.logStreakDay.unit')}</Unit>
      </View>
      <DayBox />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 24,
    gap: 16,
  },
  header: {
    gap: 8,
  },
  descriptionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})

const CountBox = styled(XStack, {
  gap: '$2',
  items: 'flex-end',
})

const Unit = styled(BaseText, {
  lineHeight: Layout.HEIGHT.RECORD_UNIT_LINE_HEIGHT,
  color: '$color11',
})
