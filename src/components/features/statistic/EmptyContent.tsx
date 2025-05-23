import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { H5 } from '@/components/shared'

function _EmptyContent() {
  const { t } = useTranslation()

  return (
    <Animated.View style={styles.container} entering={FadeIn}>
      <H5>{t('statistics.empty.title')}</H5>
      <Text>{t('statistics.empty.description')}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: 4,
  },
})

export const EmptyContent = memo(_EmptyContent)
EmptyContent.displayName = 'EmptyContent'
