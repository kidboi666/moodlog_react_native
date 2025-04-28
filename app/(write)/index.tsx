import { Trash } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { FlatList, useWindowDimensions } from 'react-native'
import { View } from 'tamagui'

import {
  FormSectionFromChooseMoodScreen,
  MoodPreview,
} from '@/features/mood/components'
import { useDeleteMood } from '@/features/mood/hooks'
import { MoodRecordFlow } from '@/features/write/components'
import { useAddJournal, useDraftManage } from '@/features/write/hooks'
import { StepProgressProvider } from '@/providers'
import {
  Delay,
  HeaderContent,
  StepDot,
  ViewContainer,
} from '@/shared/components'
import { useMood, useStepProgress, useUI } from '@/shared/store'
import { MoodLevel } from '@/shared/types'

export default function SelectMoodScreen() {
  const router = useRouter()
  const { goToNextStep, goToPrevStep, currentStep } = useStepProgress()
  const { width } = useWindowDimensions()
  const { openDeleteSheet } = useDeleteMood()
  const moods = useMood(state => state.moods)
  const [selectedMoodId, setSelectedMoodId] = useState(
    Object.keys(moods)[0] || '',
  )
  const [moodLevel, setMoodLevel] = useState<MoodLevel>(MoodLevel.HALF)
  const [[page, totalPage], setPage] = useState([0, Object.keys(moods).length])
  const flatListRef = useRef<FlatList<any>>(null)
  const setNavigating = useUI(state => state.setNavigating)

  const { onContentChange, onImageUriChange, draft } = useDraftManage(
    selectedMoodId,
    moodLevel,
  )
  const { onSubmit, isSubmitted } = useAddJournal(draft)

  const handleLeftPress = () => {
    setPage(([page, totalPage]) => [
      (page + totalPage - 1) % totalPage,
      totalPage,
    ])
  }

  const handleRightPress = () => {
    setPage(([page, totalPage]) => [(page + 1) % totalPage, totalPage])
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
            totalPage={totalPage}
            page={page}
            onNext={goToNextStep}
            onPrev={goToPrevStep}
            currentStep={currentStep}
          />
        </ViewContainer>
      </Delay>
    </StepProgressProvider>
  )
}
