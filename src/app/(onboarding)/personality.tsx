import { useRouter } from 'expo-router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Button, Card, RadioButton, Text, useTheme } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import {
  useOnboardingStep,
  usePersonalityOnboarding,
} from '@/src/features/onboarding/hooks'
import { ScreenView } from '@/src/shared/components'
import { DELAY_MS } from '@/src/shared/constants'
import { AI_PERSONALITIES } from '@/src/shared/constants/common'
import { AIPersonalityType } from '@/src/shared/types'

export default function PersonalityScreen() {
  const router = useRouter()
  const theme = useTheme()
  const { t } = useTranslation()
  const { selectedPersonality, selectPersonality, onCompleteJourney } =
    usePersonalityOnboarding()
  useOnboardingStep(2)

  const handleStartJourney = useCallback(async () => {
    await onCompleteJourney()
    router.replace('/(tabs)')
  }, [selectedPersonality, onCompleteJourney, router])

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
          onValueChange={value => selectPersonality(value as AIPersonalityType)}
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
                onPress={() => selectPersonality(personality.type)}
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
