import { useToastController } from '@tamagui/toast'
import React, {
  forwardRef,
  useCallback,
  useDeferredValue,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, TouchableOpacity } from 'react-native'
import { type Input, ScrollView } from 'tamagui'

import { ContentLength } from '@/core/components/features/write/ContentLength'
import { useCustomFont } from '@/core/hooks/useCustomFont'
import { useApp } from '@/core/store/app.store'
import { TimeFormat } from '@/types/app.types'
import { GetThemeValueForKey } from 'tamagui'
import * as S from './EnhancedTextInput.styled'

interface Props {
  imageUri: string[]
  contentValue: string
  onContentChange: (content: string) => void
  autoFocus?: boolean
  onImageUriChange?: (imageUri: string[]) => void
}

export interface EnhancedTextInputRef {
  insertCurrentTime: () => void
  focus: () => void
}

export const EnhancedTextInput = forwardRef<EnhancedTextInputRef, Props>(
  ({ contentValue, onContentChange, imageUri, onImageUriChange }, ref) => {
    const { t } = useTranslation()
    const toast = useToastController()
    const timeFormat = useApp(state => state.settings.timeFormat)
    const inputRef = useRef<Input>(null)
    const [selection, setSelection] = useState({ start: 0, end: 0 })
    const [prevLength, setPrevLength] = useState(0)
    const deferredLength = useDeferredValue(contentValue.length)
    const font = useCustomFont()

    const getCurrentTime = useCallback(() => {
      const now = new Date()

      if (timeFormat === TimeFormat.HOUR_12) {
        // 12시간제 형식 (AM/PM)
        const hours = now.getHours()
        const ampm = hours >= 12 ? 'PM' : 'AM'
        const hour12 = hours % 12 || 12 // 0시는 12시로 표시
        const minutes = String(now.getMinutes()).padStart(2, '0')
        return `${hour12}:${minutes} ${ampm}`
      }

      // 24시간제 형식 (기본값)
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      return `${hours}:${minutes}`
    }, [timeFormat])

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

    const handleContentChange = useCallback(
      (text: string) => {
        if (text.length <= 300) {
          onContentChange(text)
          if (text.length === 300 && prevLength < 300) {
            toast.show('글자 수 제한', {
              message: '최대 300자까지 작성할 수 있습니다.',
              preset: 'error',
            })
          }
          setPrevLength(text.length)
        }
      },
      [onContentChange, prevLength, toast],
    )

    const handleImagePress = useCallback(
      (index: number) => {
        Alert.alert(
          '이미지 삭제',
          '이 이미지를 삭제하시겠습니까?',
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {
              text: '삭제',
              style: 'destructive',
              onPress: () => {
                if (onImageUriChange) {
                  const newImageUri = [...imageUri]
                  newImageUri.splice(index, 1)
                  onImageUriChange(newImageUri)
                  toast.show('이미지 삭제', {
                    message: '이미지가 삭제되었습니다.',
                    preset: 'success',
                  })
                }
              },
            },
          ],
          { cancelable: true },
        )
      },
      [imageUri, onImageUriChange, toast],
    )

    useImperativeHandle(ref, () => ({
      focus: handleFocus,
      insertCurrentTime,
    }))

    return (
      <S.InputContainer>
        {imageUri.length !== 0 && (
          <S.ImageContainer>
            <ScrollView horizontal>
              {imageUri.map((uri, index) => (
                <TouchableOpacity
                  key={uri}
                  onPress={() => handleImagePress(index)}
                >
                  <S.Image source={{ uri }} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </S.ImageContainer>
        )}

        <S.TextArea
          ref={inputRef}
          fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
          value={contentValue}
          onChangeText={handleContentChange}
          onSelectionChange={event => setSelection(event.nativeEvent.selection)}
          placeholder={t('placeholders.journal.content')}
        />
        <ContentLength length={deferredLength} />
      </S.InputContainer>
    )
  },
)
