import { Layout } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

interface Props {
  aiResponse: string | null
  aiResponseAt: string | null
}

function _AiResponseCard({ aiResponse, aiResponseAt }: Props) {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Animated.View
      entering={FadeIn.duration(800).delay(300)}
      style={styles.container}
    >
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Card.Title
            title={t('journal.aiResponse.title')}
            subtitle={aiResponseAt}
            left={() => (
              <Ionicons
                name='sparkles'
                size={24}
                style={styles.icon}
                color={theme.colors.primary}
              />
            )}
            titleStyle={styles.title}
            subtitleStyle={styles.subtitle}
          />
          <Text style={styles.response}>{aiResponse}</Text>
        </Card.Content>
      </Card>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
  },
  card: {
    borderRadius: 16,
    marginVertical: 8,
  },
  content: {
    paddingVertical: 16,
  },
  icon: {
    marginTop: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  response: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
    fontStyle: 'italic',
  },
})

export const AiResponseCard = memo(_AiResponseCard)
AiResponseCard.displayName = 'AiResponseCard'
