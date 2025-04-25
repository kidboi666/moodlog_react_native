import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Card,
  GetThemeValueForKey,
  ScrollView,
  Separator,
  View,
  XStack,
  YStack,
} from 'tamagui'

import { ROUTE_DELAY_MS } from 'shared/constants'
import { useMood, useUI } from 'shared/store'
import { MoodLevel } from 'shared/types'

import {
  AnimatedEntry,
  BaseText,
  H3,
  HeaderContent,
  ViewContainer,
} from '@/shared/components'

export default function SelectMoodScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const myMoods = useMood(state => state.moods)
  const setNavigating = useUI(state => state.setNavigating)
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null)

  // 선택한 감정으로 일기 작성 페이지로 이동
  const handleNext = () => {
    if (!selectedMoodId) return

    const selectedMood = myMoods[selectedMoodId]
    setNavigating(true)

    const timer = setTimeout(() => {
      router.push({
        pathname: '/write_diary',
        params: {
          moodName: selectedMood.name,
          moodColor: selectedMood.color,
          moodLevel: MoodLevel.FULL, // 기본 최고 강도로 설정
        },
      })

      setTimeout(() => {
        setNavigating(false)
      }, 100)
    }, ROUTE_DELAY_MS)

    return () => clearTimeout(timer)
  }

  // 새 감정 만들기 페이지로 이동
  const handleCreateMood = () => {
    setNavigating(true)
    const timer = setTimeout(() => {
      router.push('/create_mood')
      setTimeout(() => {
        setNavigating(false)
      }, 100)
    }, ROUTE_DELAY_MS)

    return () => clearTimeout(timer)
  }

  if (Object.keys(myMoods).length === 0) {
    return null
  }

  return (
    <AnimatedEntry flex={1}>
      <ViewContainer
        edges={['bottom']}
        Header={<HeaderContent leftAction={() => router.back()} />}
      >
        <YStack flex={1} gap='$4' style={{ padding: 16 }}>
          <H3>{t('moods.my.selectTitle')}</H3>
          <Separator />

          <Button
            size='$4'
            theme='blue'
            onPress={handleCreateMood}
            style={{ marginVertical: 8 }}
          >
            {t('moods.my.createMoods')}
          </Button>

          <ScrollView style={{ flex: 1 }}>
            <YStack gap='$3' style={{ paddingVertical: 8 }}>
              {Object.values(myMoods).map(mood => (
                <Card
                  key={mood.id}
                  pressStyle={{ scale: 0.98 }}
                  animation='quick'
                  bordered={selectedMoodId === mood.id}
                  borderWidth={selectedMoodId === mood.id ? 2 : 0}
                  borderColor='$blue10'
                  onPress={() => setSelectedMoodId(mood.id)}
                >
                  <Card.Header padded>
                    <XStack gap='$2' items='center'>
                      <View
                        width={16}
                        height={16}
                        rounded='$4'
                        bg={
                          mood.color as GetThemeValueForKey<'backgroundColor'>
                        }
                      />
                      <BaseText fontSize='$5'>{mood.name}</BaseText>
                    </XStack>
                  </Card.Header>
                </Card>
              ))}
            </YStack>
          </ScrollView>

          <Button
            size='$5'
            theme='active'
            disabled={!selectedMoodId}
            onPress={handleNext}
            style={{ marginTop: 8 }}
          >
            {t('common.next')}
          </Button>
        </YStack>
      </ViewContainer>
    </AnimatedEntry>
  )
}
