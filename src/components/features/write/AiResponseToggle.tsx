import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Card, Switch, Text, useTheme } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { queryKeys } from '@/src/constants'
import { useCalendar } from '@/src/hooks'
import { getTodayAiResponseStatus } from '@/src/services'

interface Props {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

function _AiResponseToggle({ enabled, onToggle }: Props) {
  const { t } = useTranslation()
  const { todayString } = useCalendar()
  const theme = useTheme()

  const { data: aiStatus } = useQuery({
    queryKey: queryKeys.get.aiResponseStatus(todayString),
    queryFn: () => getTodayAiResponseStatus(todayString),
  })

  const isDisabled = aiStatus?.hasAiResponse || false

  return (
    <Animated.View entering={FadeIn.duration(400)}>
      <Card style={styles.container}>
        <Card.Content style={styles.content}>
          <View style={styles.leftContent}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name='robot-excited'
                size={24}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles.textContainer}>
              <Text variant='titleMedium' style={styles.title}>
                {t('write.aiResponse.title')}
              </Text>
              <Text variant='bodySmall' style={styles.description}>
                {isDisabled
                  ? t('write.aiResponse.alreadyReceived')
                  : t('write.aiResponse.description')}
              </Text>
            </View>
          </View>
          <Switch
            value={enabled}
            onValueChange={onToggle}
            disabled={isDisabled}
          />
        </Card.Content>
      </Card>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontWeight: '600',
  },
  description: {
    lineHeight: 18,
  },
})

export const AiResponseToggle = memo(_AiResponseToggle)
AiResponseToggle.displayName = 'AiResponseToggle'
