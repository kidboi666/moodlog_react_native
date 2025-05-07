import { MoodService } from '@/features/mood/services'
import { useSQLiteContext } from 'expo-sqlite'

export const useMood = () => {
  const db = useSQLiteContext()
  return new MoodService(db)
}
