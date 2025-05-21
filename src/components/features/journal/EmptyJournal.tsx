import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Card } from 'react-native-paper'

import { WriteButton } from '@/components/features/tab'
import { H3 } from '@/components/shared'

function _EmptyJournal() {
  const { t } = useTranslation()

  return (
    <Card style={styles.container}>
      <H3>{t('common.fallback.today')}</H3>
      <WriteButton />
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
    paddingHorizontal: 28,
    borderRadius: 20,
  },
})

export const EmptyJournal = memo(_EmptyJournal)
EmptyJournal.displayName = 'EmptyJournal'
