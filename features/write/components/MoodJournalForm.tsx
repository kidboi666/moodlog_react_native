import { KeyboardAvoidingView, Platform } from 'react-native'
import { Layout } from 'react-native-reanimated'
import { ActionButtons } from './ActionButtons'
import { EnhancedTextInput } from './EnhancedTextInput'

export const MoodJournalForm = () => {
  ;<KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
    keyboardVerticalOffset={Layout.HEIGHT.KEYBOARD_VERTICAL_OFFSET}
  >
    <EnhancedTextInput
      ref={journalInputRef}
      imageUri={draft.imageUri}
      contentValue={draft.content}
      onContentChange={onContentChange}
      onImageUriChange={onImageUriChange}
    />

    <ActionButtons
      isSubmitted={isSubmitted}
      onTimeStamp={handleTimeStamp}
      onImageUriChange={onImageUriChange}
      content={draft.content}
      onSubmit={onSubmit}
    />
  </KeyboardAvoidingView>
}
