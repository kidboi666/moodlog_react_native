import { supabase } from '@/lib'
import { useApp, useAuth, useMood } from '@/store'
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
    useAuth.persist.clearStorage()
    useApp.persist.clearStorage()
    useMood.persist.clearStorage()
  }

  const resetDatabase = () => {
    deleteDatabaseAsync('moodlog.db')
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return {
    onClearUserStorage: handleClearUserStorage,
    onClearJournalStorage: handleClearJournalStorage,
    resetStores,
    resetDatabase,
    signOut,
  }
}
