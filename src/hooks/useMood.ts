import { MoodService } from '@/services/mood.service'
import { useSQLiteContext } from 'expo-sqlite'

export const useMood = () => {
  const db = useSQLiteContext()
  return new MoodService(db)
}
