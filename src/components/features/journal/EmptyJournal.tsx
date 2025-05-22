import { useRouter } from 'expo-router'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { Card, IconButton } from 'react-native-paper'

import { H4 } from '@/components/shared'
import { useThemedStyles } from '@/hooks'

function _EmptyJournal() {
  const { t } = useTranslation()
  const router = useRouter()

  const handleRoute = () => {
    router.push('/(write)/journal')
  }

  const themedStyles = useThemedStyles(({ colors }) => ({
    container: {
      backgroundColor: colors.background.primary,
    },
  }))

  return (
    <Card mode='elevated' style={[styles.container, themedStyles.container]}>
      <H4 style={styles.title}>{t('common.fallback.today')}</H4>
      <IconButton
        icon='plus'
        style={styles.plusButton}
        mode='contained'
        onPress={handleRoute}
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 28,
    borderRadius: 20,
  },
  plusButton: {
    alignSelf: 'center',
  },
  title: {
    marginBottom: 20,
  },
})

export const EmptyJournal = memo(_EmptyJournal)
EmptyJournal.displayName = 'EmptyJournal'
