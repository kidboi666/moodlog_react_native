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
import {
  GetThemeValueForKey,
  type Input,
  ScrollView,
  Image as TamaguiImage,
  TextArea as TamaguiTextArea,
  XStack,
  YStack,
  styled,
} from 'tamagui'

import { useCustomFont } from '@/shared/hooks'
import { useApp } from '@/shared/store'
import { TimeFormat } from '@/shared/types'
import { ContentLength } from './ContentLength'

interface Props {
  imageUri: string[]
  contentValue: string
  onContentChange: (content: string) => void
  autoFocus?: boolean
  onImageUriChange: () => void
  onImageUriRemove: (imageUri: string[], index: number) => void
}

export interface EnhancedTextInputRef {
  insertCurrentTime: () => void
  focus: () => void
}

export const EnhancedTextInput = forwardRef<EnhancedTextInputRef, Props>(
  (
    {
      contentValue,
      onContentChange,
      imageUri,
      onImageUriChange,
      onImageUriRemove,
    },
    ref,
  ) => {
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
        const hours = now.getHours()
        const ampm = hours >= 12 ? 'PM' : 'AM'
        const hour12 = hours % 12 || 12 // 0시는 12시로 표시
        const minutes = String(now.getMinutes()).padStart(2, '0')
        return `${hour12}:${minutes} ${ampm}`
      }

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
                onImageUriRemove(imageUri, index)
                toast.show('이미지 삭제', {
                  message: '이미지가 삭제되었습니다.',
                  preset: 'success',
                })
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
      <InputContainer>
        {imageUri.length !== 0 && (
          <ImageContainer>
            <ScrollView horizontal>
              {imageUri.map((uri, index) => (
                <TouchableOpacity
                  key={uri}
                  onPress={() => handleImagePress(index)}
                >
                  <Image source={{ uri }} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </ImageContainer>
        )}

        <TextArea
          ref={inputRef}
          fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
          value={contentValue}
          onChangeText={handleContentChange}
          onSelectionChange={event => setSelection(event.nativeEvent.selection)}
          placeholder={t('placeholders.journal.content')}
        />
        <ContentLength length={deferredLength} />
      </InputContainer>
    )
  },
)

const InputContainer = styled(YStack, {
  flex: 1,
  gap: '$4',
})

const TextArea = styled(TamaguiTextArea, {
  color: '$gray12',
  fontSize: '$6',
  flex: 1,
  text: 'left',
  verticalAlign: 'top',
  placeholderTextColor: '$gray7',
})

const ImageContainer = styled(XStack, {
  justify: 'flex-start',
})

const Image = styled(TamaguiImage, {
  width: 80,
  height: 80,
  rounded: 12,
  mr: '$4',
  shadowColor: 'black',
  shadowOpacity: 0.5,
  shadowRadius: 10,
})
