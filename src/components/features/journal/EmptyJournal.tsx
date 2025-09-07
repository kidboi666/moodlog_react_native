import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Card, useTheme } from 'react-native-paper'

import { WriteButton } from '@/src/components/features/tab'
import { H4, H6 } from '@/src/components/shared'

interface Props {
  source: 'home' | 'entries'
}

export function EmptyJournal({ source }: Props) {
  const { t } = useTranslation()
  const theme = useTheme()
  const router = useRouter()

  if (source === 'entries') {
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
      <WriteButton style={styles.writeButton} />
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
  title: {
    marginBottom: 20,
  },
  writeButton: {
    alignSelf: 'center',
  },
})
