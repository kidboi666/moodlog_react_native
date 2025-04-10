import AsyncStorage from '@react-native-async-storage/async-storage'
import { dummyJournals } from 'dummy'

import { STORAGE_KEY } from '@/core/constants/storage'

export const useDev = () => {
  const handleClearUserStorage = async () => {
    console.log('Clearing user storage...')
    await AsyncStorage.removeItem(STORAGE_KEY.USER_INFO)
  }

  const handleClearJournalStorage = async () => {
    console.log('Clearing journal storage...')
    await AsyncStorage.removeItem(STORAGE_KEY.JOURNAL_STORE)
  }

  const handleClearStorage = async () => {
    console.log('Clearing storage...')
    await AsyncStorage.clear()
  }

  const insertDummyData = async () => {
    console.log('Inserting dummy data...')
    await AsyncStorage.setItem(
      STORAGE_KEY.JOURNAL_STORE,
      JSON.stringify(dummyJournals),
    )
  }

  return {
    onClearUserStorage: handleClearUserStorage,
    onClearJournalStorage: handleClearJournalStorage,
    onClearStorage: handleClearStorage,
    insertDummyData,
  }
}
