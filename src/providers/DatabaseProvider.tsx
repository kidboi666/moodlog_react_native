import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { PropsWithChildren, useEffect } from 'react'
import { seedDatabase } from '../../db/seed'
import { sqliteDb } from '../../db/sqlite'
import migrations from '../../db/sqlite/drizzle/migrations'

export function DatabaseProvider({ children }: PropsWithChildren) {
  useMigrations(sqliteDb, migrations)

  useEffect(() => {
    seedDatabase()
  }, [])
  return <>{children}</>
}
