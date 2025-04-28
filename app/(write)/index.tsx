import { Trash } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, useWindowDimensions } from 'react-native'

import {
  FormSectionFromChooseMoodScreen,
  MoodPreviewItem,
} from '@/features/mood/components'
import { useDeleteMood } from '@/features/mood/hooks'
import {
  EmptyMoodView,
  type EnhancedTextInputRef,
  MoodRecordFlow,
} from '@/features/write/components'
import { useAddJournal, useDraftManage } from '@/features/write/hooks'
import { StepProgressProvider } from '@/providers'
import {
  Delay,
  HeaderContent,
  StepDot,
  ViewContainer,
} from '@/shared/components'
import { DelayMS } from '@/shared/constants'
import { useMood, useStepProgress } from '@/shared/store'
import { MoodLevel } from '@/shared/types'

export default function SelectMoodScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const { goToNextStep, goToPrevStep, currentStep } = useStepProgress()
  const { width } = useWindowDimensions()
  const { openDeleteSheet } = useDeleteMood()
  const moods = useMood(state => state.moods)
  const moodLength = Object.keys(moods).length
  const [selectedMoodId, setSelectedMoodId] = useState(
    Object.keys(moods)[0] || '',
  )
  const [moodLevel, setMoodLevel] = useState<MoodLevel>(MoodLevel.HALF)
  const [[page, totalPage], setPage] = useState([0, moodLength])
  const flatListRef = useRef<FlatList<any>>(null)

  const { onContentChange, onImageUriChange, draft } = useDraftManage(
    selectedMoodId,
    moodLevel,
  )
  const { onSubmit, isSubmitted } = useAddJournal(draft)
  const journalInputRef = useRef<EnhancedTextInputRef>(null)

  const handleLeftPress = () => {
    setPage(([page, totalPage]) => [
      (page + totalPage - 1) % totalPage,
      totalPage,
    ])
  }

  const handleRightPress = () => {
    setPage(([page, totalPage]) => [(page + 1) % totalPage, totalPage])
  }

  const handleCreateMood = () => {
    router.push('/create_mood')
  }

  const handleTimeStamp = () => {
    journalInputRef.current?.insertCurrentTime()
  }

  useEffect(() => {
    if (flatListRef.current && Object.values(moods).length > 0) {
      flatListRef.current.scrollToIndex({
        index: page,
        animated: true,
      })
    }
  }, [page])

  useEffect(() => {
    const newTotalPage = Object.keys(moods).length
    setPage(prev => [prev[0] < newTotalPage ? prev[0] : 0, newTotalPage])

    if (newTotalPage > 0 && !selectedMoodId) {
      setSelectedMoodId(Object.keys(moods)[0])
    }
  }, [moods, selectedMoodId])

  // 일기 작성 단계일 때 입력창에 포커스
  useEffect(() => {
    if (currentStep === 2) {
      const focusTimer = setTimeout(() => {
        requestAnimationFrame(() => {
          journalInputRef.current?.focus()
        })
      }, DelayMS.ROUTE)

      return () => clearTimeout(focusTimer)
    }
  }, [currentStep])

  if (moodLength === 0) {
    return (
      <Delay flex={1}>
        <ViewContainer
          edges={['bottom']}
          gap='$4'
          Header={<HeaderContent leftAction={() => router.back()} />}
        >
          <EmptyMoodView />
        </ViewContainer>
      </Delay>
    )
  }

  return (
    <StepProgressProvider totalSteps={3}>
      <Delay flex={1}>
        <ViewContainer
          edges={['bottom']}
          gap='$4'
          Header={
            <HeaderContent
              leftAction={() => router.back()}
              rightAction={() => openDeleteSheet(selectedMoodId)}
              rightActionIcon={Trash}
            >
              <StepDot />
            </HeaderContent>
          }
        >
          <FlatList
            ref={flatListRef}
            data={Object.values(moods)}
            renderItem={({ item }) => (
              <MoodPreviewItem
                width={width}
                name={item.name}
                color={item.color}
              />
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
          <MoodRecordFlow
            page={page}
            totalPage={totalPage}
            currentStep={currentStep}
            moods={moods}
            moodLevel={moodLevel}
            setMoodLevel={setMoodLevel}
            selectedMoodId={selectedMoodId}
            onLeftPress={handleLeftPress}
            onRightPress={handleRightPress}
            onSubmit={onSubmit}
          />
          <FormSectionFromChooseMoodScreen
            selectedMoodId={selectedMoodId}
            onNext={goToNextStep}
            onPrev={goToPrevStep}
            currentStep={currentStep}
          />
        </ViewContainer>
      </Delay>
    </StepProgressProvider>
  )
}
