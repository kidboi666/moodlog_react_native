import { useToastController } from '@tamagui/toast'
import { Image } from 'expo-image'
import React, { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import { FormInputArea } from '@/components/shared'
import { IconButton } from '@/components/shared/Button'
import { DelayMS, Layout } from '@/constants'
import { useCustomFont } from '@/hooks'
import { useStepProgress } from '@/store'

interface Props {
  show: boolean
  imageUri: string[]
  contentValue: string
  onContentChange: (content: string) => void
  autoFocus?: boolean
  onImageUriChange: () => void
  onImageUriRemove: (imageUri: string[], index: number) => void
}

export function EnhancedTextInput({
  show,
  contentValue,
  onContentChange,
  imageUri,
  onImageUriChange,
  onImageUriRemove,
}: Props) {
  const { t } = useTranslation()
  const toast = useToastController()
  const { fontNameWithTokenPrefix } = useCustomFont()
  const {
    state: { currentStep },
  } = useStepProgress()
  const inputRef = useRef<any>(null)

  const handleContentChange = useCallback((text: string) => {
    onContentChange(text)
  }, [])

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
    <View style={styles.container}>
      {imageUri.length !== 0 && (
        <View style={styles.imageBox}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {imageUri.map((uri, index) => (
              <TouchableOpacity
                key={uri}
                onPress={() => handleImagePress(index)}
              >
                <Image style={styles.image} source={{ uri }} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      <IconButton onPress={onImageUriChange} icon='image-plus' />

      <FormInputArea
        ref={inputRef}
        value={contentValue}
        onChangeText={handleContentChange}
        placeholder={t('placeholders.journal.content')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
    width: '100%',
    gap: 8,
  },
  button: {
    alignSelf: 'flex-end',
  },
  imageBox: {
    justifyContent: 'flex-start',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
})
