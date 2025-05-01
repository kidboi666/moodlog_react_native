import { useToastController } from '@tamagui/toast'
import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, TouchableOpacity } from 'react-native'
import {
  Button,
  type Input,
  ScrollView,
  Image as TamaguiImage,
  TextArea as TamaguiTextArea,
  XStack,
  YStack,
  styled,
} from 'tamagui'

import {
  DelayMS,
  Layout,
  MOUNT_STYLE,
  MOUNT_STYLE_KEY,
} from '@/shared/constants'
import { useCustomFont } from '@/shared/hooks'
import { useStepProgress } from '@/shared/store'
import { ImagePlus } from '@tamagui/lucide-icons'
import { ContentLength } from './ContentLength'

interface Props {
  show: boolean
  imageUri: string[]
  contentValue: string
  onContentChange: (content: string) => void
  autoFocus?: boolean
  onImageUriChange: () => void
  onImageUriRemove: (imageUri: string[], index: number) => void
}

export const EnhancedTextInput = ({
  show,
  contentValue,
  onContentChange,
  imageUri,
  onImageUriChange,
  onImageUriRemove,
}: Props) => {
  const { t } = useTranslation()
  const toast = useToastController()
  const deferredLength = useDeferredValue(contentValue.length)
  const { fontNameWithTokenPrefix } = useCustomFont()
  const {
    state: { currentStep },
  } = useStepProgress()
  const [prevLength, setPrevLength] = useState(0)
  const inputRef = useRef<Input>(null)

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

  useEffect(() => {
    if (!show) {
      return
    }
    let focusTimer: NodeJS.Timeout

    if (currentStep === 2) {
      focusTimer = setTimeout(() => {
        requestAnimationFrame(() => {
          inputRef.current?.focus()
        })
      }, DelayMS.ROUTE)
    }

    return () => clearTimeout(focusTimer)
  }, [])

  if (!show) {
    return null
  }

  return (
    <InputContainer>
      {imageUri.length !== 0 && (
        <ImageContainer>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
      <Button
        noTextWrap
        self='flex-end'
        color='$color11'
        scaleIcon={1.5}
        onPress={onImageUriChange}
        icon={ImagePlus}
      />

      <TextArea
        ref={inputRef}
        fontFamily={fontNameWithTokenPrefix}
        value={contentValue}
        onChangeText={handleContentChange}
        placeholder={t('placeholders.journal.content')}
      />
      <ContentLength length={deferredLength} />
    </InputContainer>
  )
}

const InputContainer = styled(YStack, {
  animation: 'lazy',
  enterStyle: MOUNT_STYLE,
  animateOnly: MOUNT_STYLE_KEY,

  flex: 1,
  px: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
  width: '100%',
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
