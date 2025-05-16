import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { PropsWithChildren } from 'react'
import migrations from '../../db/drizzle/migrations'
import { sqliteDb } from '../../db/sqlite'

export const DatabaseProvider = ({ children }: PropsWithChildren) => {
  const { error } = useMigrations(sqliteDb, migrations)
  if (error) {
    console.error(error)
  }
  return <>{children}</>
}
