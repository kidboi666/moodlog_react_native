import { Image } from 'expo-image'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { IconButton, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'

interface Props {
  imageUri: string[]
  contentValue: string
  onContentChange: (content: string) => void
  autoFocus?: boolean
  onSubmit: () => void
  onImageUriChange: () => void
  onImageUriRemove: (imageUri: string[], index: number) => void
}

export function EnhancedTextInput({
  contentValue,
  onContentChange,
  onSubmit,
  imageUri,
  onImageUriChange,
  onImageUriRemove,
}: Props) {
  const { t } = useTranslation()

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
              Toast.show({
                text1: '이미지 삭제',
                text2: '이미지가 삭제되었습니다.',
                type: 'success',
              })
            },
          },
        ],
        { cancelable: true },
      )
    },
    [imageUri, onImageUriChange],
  )

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
      <TextInput
        multiline
        label={t('common.content')}
        textAlignVertical='top'
        value={contentValue}
        onChangeText={handleContentChange}
        placeholder={t('placeholders.journal.content')}
        style={styles.textarea}
      />
      <View style={styles.buttonBox}>
        <IconButton onPress={onImageUriChange} icon='image-plus' />
        <IconButton onPress={onSubmit} icon='send' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
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
  textarea: {
    height: 200,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})
