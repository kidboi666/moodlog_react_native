import React, {
  forwardRef,
  useCallback,
  useDeferredValue,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { type Input, ScrollView } from 'tamagui'

import { ContentLength } from '@/core/components/features/write/ContentLength'

import { Nullable } from '@/types/util.types'

import * as S from './EnhancedTextInput.styled'

interface Props {
  imageUri: string[]
  contentValue: string
  onContentChange: (content: string) => void
  autoFocus?: boolean
}

export interface EnhancedTextInputRef {
  insertCurrentTime: () => void
  focus: () => void
}

export const EnhancedTextInput = forwardRef<EnhancedTextInputRef, Props>(
  ({ contentValue, onContentChange, imageUri }, ref) => {
    const { t } = useTranslation()
    const inputRef = useRef<Input>(null)
    const [selection, setSelection] = useState({ start: 0, end: 0 })
    const deferredLength = useDeferredValue(contentValue.length)

    const getCurrentTime = useCallback(() => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      return `${hours}:${minutes}`
    }, [])

    const handleFocus = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    const insertCurrentTime = () => {
      const currentTime = getCurrentTime()

      const newContent =
        contentValue.slice(0, selection.start) +
        currentTime +
        contentValue.slice(selection.end)
      const newPosition = selection.start + currentTime.length
      setSelection({ start: newPosition, end: newPosition })
      onContentChange(newContent)

      setTimeout(() => handleFocus(), 0)
    }

    useImperativeHandle(ref, () => ({
      focus: handleFocus,
      insertCurrentTime,
    }))

    return (
      <S.InputContainer>
        {imageUri.length !== 0 && (
          <S.ImageContainer>
            <ScrollView horizontal>
              {imageUri.map(uri => (
                <S.Image key={uri} source={{ uri }} />
              ))}
            </ScrollView>
          </S.ImageContainer>
        )}

        <S.TextArea
          ref={inputRef}
          value={contentValue}
          onChangeText={onContentChange}
          onSelectionChange={event => setSelection(event.nativeEvent.selection)}
          placeholder={t('placeholders.journal.content')}
        />
        <ContentLength length={deferredLength} />
      </S.InputContainer>
    )
  },
)
