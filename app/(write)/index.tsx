import { useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, useWindowDimensions } from 'react-native'
import { Button, View, XStack, YStack } from 'tamagui'

import { MoodPreview } from '@/features/mood/components'
import { useDeleteMood } from '@/features/mood/hooks'
import {
  Delay,
  H3,
  HeaderContent,
  PaginationDot,
  PressableButton,
  ViewContainer,
} from '@/shared/components'
import {
  CONTAINER_HORIZONTAL_PADDING,
  CONTAINER_MARGIN_TOP,
  ROUTE_DELAY_MS,
} from '@/shared/constants'
import { useMood, useUI } from '@/shared/store'
import { MoodLevel } from '@/shared/types'
import { ChevronLeft, ChevronRight, Trash } from '@tamagui/lucide-icons'

export default function SelectMoodScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const { width } = useWindowDimensions()
  const { openDeleteSheet } = useDeleteMood()
  const myMoods = useMood(state => state.moods)
  const setNavigating = useUI(state => state.setNavigating)
  const [selectedMoodId, setSelectedMoodId] = useState(
    Object.keys(myMoods)[0] || '',
  )
  const [[page, totalPage], setPage] = useState([
    0,
    Object.keys(myMoods).length,
  ])
  const flatListRef = useRef<FlatList<any>>(null)

  const handleLeftPress = () => {
    setPage(([page, totalPage]) => [
      (page + totalPage - 1) % totalPage,
      totalPage,
    ])
  }

  const handleRightPress = () => {
    setPage(([page, totalPage]) => [(page + 1) % totalPage, totalPage])
  }

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

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: page,
        animated: true,
      })
    }
  }, [page])

  return (
    <Delay flex={1}>
      <ViewContainer
        edges={['bottom']}
        px={0}
        Header={
          <HeaderContent
            px={CONTAINER_HORIZONTAL_PADDING}
            leftAction={() => router.back()}
            rightAction={() => openDeleteSheet(selectedMoodId)}
            rightActionIcon={Trash}
          />
        }
      >
        <YStack flex={1} gap='$4' mt={CONTAINER_MARGIN_TOP}>
          <FlatList
            ref={flatListRef}
            data={Object.values(myMoods)}
            renderItem={({ item }) => (
              <View width={width}>
                <MoodPreview name={item.name} color={item.color} />
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            snapToAlignment='start'
            snapToInterval={width}
            keyExtractor={item => item.id}
            onViewableItemsChanged={({ viewableItems }) => {
              setSelectedMoodId(viewableItems[0]?.item?.id || '')
            }}
            onMomentumScrollEnd={({ nativeEvent }) => {
              const page = Math.round(nativeEvent.contentOffset.x / width)
              setPage([page, totalPage])
            }}
            pagingEnabled
            decelerationRate='fast'
            horizontal
          />
          <YStack gap='$4' px={CONTAINER_HORIZONTAL_PADDING}>
            <XStack justify='space-between' items='center'>
              <Button
                bg='transparent'
                icon={ChevronLeft}
                onPress={handleLeftPress}
              />
              <H3>{t('moods.my.selectTitle')}</H3>
              <Button
                bg='transparent'
                icon={ChevronRight}
                onPress={handleRightPress}
              />
            </XStack>
            <PaginationDot totalPage={totalPage} page={page} />
          </YStack>
          <YStack px={CONTAINER_HORIZONTAL_PADDING}>
            <PressableButton onPress={handleCreateMood}>
              {t('moods.my.createMoods')}
            </PressableButton>
            <PressableButton
              disabled={!selectedMoodId}
              onPress={handleNext}
              style={{ marginTop: 8 }}
            >
              {t('common.ok')}
            </PressableButton>
          </YStack>
        </YStack>
      </ViewContainer>
    </Delay>
  )
}
