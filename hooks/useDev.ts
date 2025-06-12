import { useApp } from '@/store'
import { deleteDatabaseAsync } from 'expo-sqlite'

export const useDev = () => {
  const handleClearUserStorage = async () => {
    console.log('Clearing user storage...')
  }

  const handleClearJournalStorage = async () => {
    console.log('Clearing journal storage...')
  }

  const resetStores = () => {
    console.log('Clearing storage...')
    useApp.persist.clearStorage()
  }

  const resetDatabase = () => {
    deleteDatabaseAsync('moodlog.db')
  }

  return {
    onClearUserStorage: handleClearUserStorage,
    onClearJournalStorage: handleClearJournalStorage,
    resetStores,
    resetDatabase,
  }
}
