import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Card, IconButton, Surface, useTheme } from 'react-native-paper'

import { H4, H6 } from '@/components/shared'

interface Props {
  variant: 'home' | 'entries'
}

export function EmptyJournal({ variant }: Props) {
  const { t } = useTranslation()
  const theme = useTheme()
  const router = useRouter()

  const handleRoute = () => {
    router.push('/write')
  }

  if (variant === 'entries') {
    return (
      <View style={styles.entriesContainer}>
        <H4 style={styles.title}>{t('common.fallback.empty.title')}</H4>
        <H6 style={{ color: theme.colors.onSurfaceVariant }}>
          {t('common.fallback.empty.description')}
        </H6>
      </View>
    )
  }
  return (
    <Card style={styles.homeContainer}>
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
  homeContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 28,
    borderRadius: 20,
  },
  entriesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  plusButton: {
    alignSelf: 'center',
  },
  title: {
    marginBottom: 20,
  },
})
