import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { PermissionStatus } from 'expo-image-picker'
import type { ImagePickerAsset } from 'expo-image-picker/src/ImagePicker.types'

const JOURNAL_IMAGES_DIR = FileSystem.documentDirectory
  ? `${FileSystem.documentDirectory}journal_images/`
  : ''

export class ImageService {
  static createFilePath(result: ImagePickerAsset) {
    const dateString = new Date().toISOString().split('T')[0]
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const fileExt = result.uri.split('.').pop()
    const fileName = `${dateString}-${timestamp}-${randomString}.${fileExt}`
    return `${JOURNAL_IMAGES_DIR}${fileName}`
  }

  static async createNewFileName() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== PermissionStatus.GRANTED) {
      alert('사진을 추가하기 위해선 사진 접근 권한이 필요합니다.')
      return null
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    })

    if (result.canceled) {
      return null
    }

    const dirInfo = await FileSystem.getInfoAsync(JOURNAL_IMAGES_DIR)

    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(JOURNAL_IMAGES_DIR, {
        intermediates: true,
      })
    }

    const newFilePath = ImageService.createFilePath(result.assets[0])

    await FileSystem.copyAsync({
      from: result.assets[0].uri,
      to: newFilePath,
    })

    return newFilePath
  }
}
