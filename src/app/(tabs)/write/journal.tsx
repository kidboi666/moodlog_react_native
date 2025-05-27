import { useLocalSearchParams } from 'expo-router'

import { EnhancedTextInput } from '@/components/features/write'
import { ScreenView } from '@/components/shared'
import { useJournalDraftForm } from '@/hooks'
import { useAddJournal } from '@/queries'
import { toSingle } from '@/utils'

export default function WriteJournalScreen() {
  const { moodName } = useLocalSearchParams()
  const {
    draft,
    onContentChange,
    onImageUriChange,
    onAiResponseChange,
    onImageUriRemove,
  } = useJournalDraftForm(toSingle(moodName))
  const { mutate: onSubmit } = useAddJournal()

  const handleSubmit = () => {
    onSubmit(draft)
  }

  return (
    <ScreenView>
      <EnhancedTextInput
        onSubmit={handleSubmit}
        imageUri={draft.imageUri}
        contentValue={draft.content}
        aiResponseEnabled={draft.aiResponseEnabled}
        onContentChange={onContentChange}
        onImageUriRemove={onImageUriRemove}
        onImageUriChange={onImageUriChange}
        onAiResponseChange={onAiResponseChange}
      />
    </ScreenView>
  )
}
