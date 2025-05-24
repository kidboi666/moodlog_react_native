import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { H3 } from '@/components/shared'

function _GardenTitleHeader() {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <H3>{t('entries.garden.title')}</H3>
      <Text>{t('entries.garden.description')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
})

export const GardenTitleHeader = memo(_GardenTitleHeader)

GardenTitleHeader.displayName = 'GardenTitleHeader'
