import { Dispatch, SetStateAction } from 'react'

import { MoodListPreview } from '@/features/write/components'
import { useStepProgress } from '@/shared/store'

interface Props {
  page: number
  moods: Record<string, any>
  totalPage: number
  setPage: Dispatch<SetStateAction<[number, number]>>
  setSelectedMoodId: (moodId: string) => void
}

export const MainRecordFlow = ({
  page,
  moods,
  totalPage,
  setPage,
  setSelectedMoodId,
}: Props) => {
  const {
    state: { currentStep },
  } = useStepProgress()

  return (
    <MoodListPreview
      moods={moods}
      scrollEnabled={currentStep === 0}
      setSelectedMoodId={setSelectedMoodId}
      page={page}
      totalPage={totalPage}
      setPage={setPage}
      show={currentStep !== 2}
    />
  )
}
