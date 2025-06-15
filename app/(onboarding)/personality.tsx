import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, RadioButton, Text, useTheme } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { ScreenView } from '@/components/shared'
import { DelayMS } from '@/constants'
import { useStepProgress } from '@/context'
import { useApp } from '@/store'
import { AIPersonalityType } from '@/types'

export default function PersonalityScreen() {
  const theme = useTheme()
  const router = useRouter()
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
        entering={FadeIn.delay(DelayMS.ANIMATION.LONG)}
        style={styles.header}
      >
        <Text variant='displayMedium'>시작할 준비가 되었어요!</Text>
        <Text variant='titleMedium'>
          당신의 일기에 답장해줄 AI의 친절도를 선택하세요.
        </Text>
      </Animated.View>
      <Animated.View
        entering={FadeIn.delay(DelayMS.ANIMATION.LONG * 2)}
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
                        {personality.title}
                      </Text>
                      <Text
                        variant='bodyMedium'
                        style={{ color: theme.colors.onSurfaceVariant }}
                      >
                        {personality.description}
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
        entering={FadeIn.delay(DelayMS.ANIMATION.LONG * 3)}
        style={styles.submitBox}
      >
        <Button
          mode='contained'
          onPress={handleStartJourney}
          style={styles.button}
        >
          시작하기
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
  button: {},
})

const AI_PERSONALITIES = [
  {
    type: AIPersonalityType.RATIONAL,
    title: '냉철한 분석가',
    description: '객관적이고 실용적인 조언을 제공합니다',
    emoji: '🧠',
  },
  {
    type: AIPersonalityType.BALANCED,
    title: '균형잡힌 조언자',
    description: '공감과 현실적 조언의 균형을 맞춥니다',
    emoji: '⚖️',
  },
  {
    type: AIPersonalityType.COMPASSIONATE,
    title: '다정한 치유자',
    description: '따뜻한 위로와 깊은 공감을 전합니다',
    emoji: '💝',
  },
]
