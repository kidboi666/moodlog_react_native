import { View } from 'tamagui'

import { MoodLevelForm, MoodPagination } from '@/features/mood/components'
import { Layout } from '@/shared/constants'
import { MoodLevel, Moods } from '@/shared/types'
import { MoodJournal } from './MoodJournal'

interface Props {
  page: number
  totalPage: number
  currentStep: number
  moods: Moods
  moodLevel: MoodLevel
  setMoodLevel: (moodLevel: MoodLevel) => void
  selectedMoodId: string
  onLeftPress: () => void
  onRightPress: () => void
  onSubmit: () => void
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
  onSubmit,
}: Props) => {
  return (
    <View
      height={currentStep === 2 ? 0 : Layout.HEIGHT.WRITE_PROGRESS_BAR_HEIGHT}
    >
      <MoodPagination
        show={currentStep === 0}
        page={page}
        totalPage={totalPage}
        onLeftPress={onLeftPress}
        onRightPress={onRightPress}
      />
      <MoodLevelForm
        show={!!(currentStep === 1 && selectedMoodId && moods[selectedMoodId])}
        moodColor={moods[selectedMoodId]?.color}
        moodLevel={moodLevel}
        setMoodLevel={setMoodLevel}
      />
      <MoodJournal
        show={currentStep === 2}
        moodName={moods[selectedMoodId]?.name}
        moodLevel={moodLevel}
      />
    </View>
  )
}
