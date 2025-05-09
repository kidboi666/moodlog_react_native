import { deleteDatabaseAsync } from 'expo-sqlite'
import { useApp, useAuth, useJournal, useMood } from 'store'

export const useDev = () => {
  const handleClearUserStorage = async () => {
    console.log('Clearing user storage...')
  }

  const handleClearJournalStorage = async () => {
    console.log('Clearing journal storage...')
  }

  const resetStores = () => {
    console.log('Clearing storage...')
    useAuth.persist.clearStorage()
    useApp.persist.clearStorage()
    useJournal.persist.clearStorage()
    useMood.persist.clearStorage()
  }

  const resetDatabase = () => {
    deleteDatabaseAsync('moodlog.db')
  }

  const insertDummyData = async () => {
    console.log('Inserting dummy data...')
  }

  return {
    onClearUserStorage: handleClearUserStorage,
    onClearJournalStorage: handleClearJournalStorage,
    resetStores,
    resetDatabase,
    insertDummyData,
  }
}
