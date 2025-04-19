import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Card,
  ScrollView,
  Separator,
  View,
  XStack,
  YStack,
  styled,
} from 'tamagui'

import { ROUTE_DELAY_MS } from '@/constants'
import { useApp, useUI } from '@/store'
import { MoodLevel } from '@/types'

import { BaseText } from '@/components/shared/BaseText'
import { FadeIn } from '@/components/shared/FadeIn.styleable'
import { HeaderContainer } from '@/components/shared/HeaderContainer.styleable'
import { H3 } from '@/components/shared/Heading'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'

const StyledView = styled(View, {
  variants: {
    circle: {
      true: {
        width: 16,
        height: 16,
        borderRadius: 8,
      },
    },
  },
})

export default function Screen() {
  const router = useRouter()
  const { t } = useTranslation()
  const myMoods = useApp(state => state.myMoods)
  const setNavigating = useUI(state => state.setNavigating)
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null)

  // 만든 감정이 없으면 감정 만드는 페이지로 리다이렉트
  useEffect(() => {
    if (Object.keys(myMoods).length === 0) {
      setNavigating(true)
      const timer = setTimeout(() => {
        router.replace('/create_mood')
        setTimeout(() => {
          setNavigating(false)
        }, 100)
      }, ROUTE_DELAY_MS)

      return () => clearTimeout(timer)
    }
  }, [myMoods, router, setNavigating])

  // 선택한 감정으로 일기 작성 페이지로 이동
  const handleNext = () => {
    if (!selectedMoodId) return

    const selectedMood = myMoods[selectedMoodId]
    setNavigating(true)

    const timer = setTimeout(() => {
      router.push({
        pathname: '/writing_page',
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

  if (Object.keys(myMoods).length === 0) {
    return null // useEffect에서 리다이렉트하므로 아무것도 렌더링하지 않음
  }

  return (
    <FadeIn flex={1}>
      <ViewContainer
        edges={['bottom']}
        Header={<HeaderContainer leftAction={() => router.back()} />}
      >
        <YStack flex={1} space='$4' style={{ padding: 16 }}>
          <H3>{t('moods.my.selectTitle')}</H3>
          <Separator />

          <ScrollView style={{ flex: 1 }}>
            <YStack space='$3' style={{ paddingVertical: 8 }}>
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
                    <XStack space='$2' style={{ alignItems: 'center' }}>
                      <StyledView
                        circle
                        style={{ backgroundColor: mood.color }}
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
    </FadeIn>
  )
}
