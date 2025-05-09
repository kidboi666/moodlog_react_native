import { db, expoSQLite } from '@/lib/drizzle'
import migrations from 'db/drizzle/migrations'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin'
import { SQLiteDatabase } from 'expo-sqlite'

export function useDatabaseMigrations() {
  const { success, error } = useMigrations(db, migrations)
  useStudio(expoSQLite)
}

function useStudio(db: SQLiteDatabase | null) {
  const studio = __DEV__ ? useDrizzleStudio : () => {}
  return studio(db)
}
