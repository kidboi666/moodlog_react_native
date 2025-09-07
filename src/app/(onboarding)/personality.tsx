import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, RadioButton, Text, useTheme } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { useApp } from '@/src/data/store'
import { ScreenView } from '@/src/shared/components'
import { DELAY_MS } from '@/src/shared/constants'
import { AI_PERSONALITIES } from '@/src/shared/constants/common'
import { useStepProgress } from '@/src/shared/context'
import { AIPersonalityType } from '@/src/shared/types'
import { useTranslation } from 'react-i18next'

export default function PersonalityScreen() {
  const theme = useTheme()
  const router = useRouter()
  const { t } = useTranslation()
  const { setStep } = useStepProgress()
  const { onSettingChange, setOnboardingCompleted } = useApp()
  const [selectedPersonality, setSelectedPersonality] =
    useState<AIPersonalityType>(AIPersonalityType.BALANCED)

  const handleStartJourney = async () => {
    await onSettingChange('aiPersonalityType', selectedPersonality)
    setOnboardingCompleted()
    router.replace('/(tabs)')
  }

  useFocusEffect(
    useCallback(() => {
      setStep(2)
    }, []),
  )

  return (
    <ScreenView edges={['bottom']}>
      <Animated.View
        entering={FadeIn.delay(DELAY_MS.ANIMATION.LONG)}
        style={styles.header}
      >
        <Text variant='displaySmall'>{t('onboarding.personality.title')}</Text>
        <Text variant='titleMedium'>
          {t('onboarding.personality.description')}
        </Text>
      </Animated.View>
      <Animated.View
        entering={FadeIn.delay(DELAY_MS.ANIMATION.LONG * 2)}
        style={styles.personalitySection}
      >
        <RadioButton.Group
          value={selectedPersonality}
          onValueChange={value =>
            setSelectedPersonality(value as AIPersonalityType)
          }
        >
          <View style={styles.cardContainer}>
            {AI_PERSONALITIES.map(personality => (
              <Card
                key={personality.type}
                style={[
                  styles.personalityCard,
                  selectedPersonality === personality.type && {
                    borderColor: theme.colors.primary,
                  },
                ]}
                onPress={() => setSelectedPersonality(personality.type)}
              >
                <Card.Content style={styles.cardContent}>
                  <View style={styles.personalityHeader}>
                    <Text variant='headlineLarge'>{personality.emoji}</Text>
                    <View style={styles.personalityInfo}>
                      <Text
                        variant='titleMedium'
                        style={styles.personalityTitle}
                      >
                        {t(personality.title)}
                      </Text>
                      <Text
                        variant='bodyMedium'
                        style={{ color: theme.colors.onSurfaceVariant }}
                      >
                        {t(personality.description)}
                      </Text>
                    </View>
                    <RadioButton value={personality.type} />
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
        </RadioButton.Group>
      </Animated.View>

      <Animated.View
        entering={FadeIn.delay(DELAY_MS.ANIMATION.LONG * 3)}
        style={styles.submitBox}
      >
        <Button mode='contained' onPress={handleStartJourney}>
          {t('common.start')}
        </Button>
      </Animated.View>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  header: {
    gap: 24,
  },
  personalitySection: {
    flex: 1,
    gap: 12,
    marginVertical: 24,
  },
  personalityCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardContainer: {
    gap: 12,
  },
  cardContent: {
    paddingVertical: 16,
  },
  personalityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  personalityInfo: {
    flex: 1,
    gap: 4,
  },
  personalityTitle: {
    fontWeight: '600',
  },
  submitBox: {
    gap: 12,
    flex: 1,
    justifyContent: 'flex-end',
  },
})
