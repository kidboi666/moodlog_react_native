import { useApp } from '@/core/store/app.store'
import { useJournal } from '@/core/store/journal.store'
import { useUser } from '@/core/store/user.store'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useDev = () => {
  const handleClearUserStorage = async () => {
    console.log('Clearing user storage...')
  }

  const handleClearJournalStorage = async () => {
    console.log('Clearing journal storage...')
  }

  const resetStores = () => {
    console.log('Clearing storage...')
    useUser.persist.clearStorage()
    useApp.persist.clearStorage()
    useJournal.persist.clearStorage()
  }

  const insertDummyData = async () => {
    console.log('Inserting dummy data...')
  }

  return {
    onClearUserStorage: handleClearUserStorage,
    onClearJournalStorage: handleClearJournalStorage,
    resetStores,
    insertDummyData,
  }
}
