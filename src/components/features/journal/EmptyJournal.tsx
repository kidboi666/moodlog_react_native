import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { Card, IconButton, useTheme } from 'react-native-paper'

import { H4 } from '@/components/shared'

export function EmptyJournal() {
  const { t } = useTranslation()
  const theme = useTheme()
  const router = useRouter()

  const handleRoute = () => {
    router.push('/write')
  }

  return (
    <Card style={styles.container}>
      <H4 style={styles.title}>{t('common.fallback.today')}</H4>
      <IconButton
        icon='plus'
        mode='contained'
        containerColor={theme.colors.primaryContainer}
        style={styles.plusButton}
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
