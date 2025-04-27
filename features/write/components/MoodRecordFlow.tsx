import { MoodLevelForm, PaginationButton } from '@/features/mood/components'
import { MoodJournal } from '@/features/write/components/MoodJournal'
import { PaginationDot } from '@/shared/components'
import { Layout } from '@/shared/constants'
import { useBottomSheet } from '@/shared/store'
import { BottomSheetType, MoodLevel, Moods } from '@/shared/types'
import { useEffect } from 'react'
import { View } from 'tamagui'

interface Props {
  page: number
  totalPage: number
  currentStep: number
  moods: Moods
  moodLevel?: MoodLevel
  setMoodLevel: (moodLevel: MoodLevel) => void
  selectedMoodId: string
  onLeftPress: () => void
  onRightPress: () => void
}

export const MoodRecordFlow = ({
  page,
  totalPage,
  currentStep,
  moods,
  moodLevel,
  setMoodLevel,
  selectedMoodId,
  onLeftPress,
  onRightPress,
}: Props) => {
  const showBottomSheet = useBottomSheet(state => state.showBottomSheet)
  useEffect(() => {
    if (currentStep === 2) {
      showBottomSheet(
        BottomSheetType.WRITE_JOURNAL,
        Layout.SNAP_POINTS.JOURNAL_WRITE,
        {},
      )
    }
  })
  return (
    <View height={Layout.HEIGHT.WRITE_PROGRESS_BAR_HEIGHT}>
      {currentStep === 0 && (
        <>
          <PaginationButton
            page={page}
            totalPage={totalPage}
            onLeftPress={onLeftPress}
            onRightPress={onRightPress}
          />
          <PaginationDot totalPage={totalPage} page={page} />
        </>
      )}
      {currentStep === 1 && (
        <MoodLevelForm
          moodColor={moods[selectedMoodId].color}
          moodLevel={moodLevel}
          setMoodLevel={setMoodLevel}
        />
      )}
    </View>
  )
}
