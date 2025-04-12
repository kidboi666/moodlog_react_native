import AsyncStorage from '@react-native-async-storage/async-storage'

import type { STORAGE_KEY } from '@/core/constants/storage'
import type { ValueOf } from '@/types/util.types'

export class StorageService {
  static async load(key: ValueOf<typeof STORAGE_KEY>) {
    const dataList = await AsyncStorage.getItem(key)

    return dataList ? JSON.parse(dataList) : null
  }

  static async save(key: ValueOf<typeof STORAGE_KEY>, data: any) {
    await AsyncStorage.setItem(key, JSON.stringify(data))
  }

  static async delete(key: ValueOf<typeof STORAGE_KEY>) {
    await AsyncStorage.removeItem(key)
  }
}
