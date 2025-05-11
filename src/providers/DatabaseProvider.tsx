import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { PropsWithChildren } from 'react'
import { db } from '../../db'
import migrations from '../../db/drizzle/migrations'

export const DatabaseProvider = ({ children }: PropsWithChildren) => {
  const { error } = useMigrations(db, migrations)
  if (error) {
    console.error(error)
  }
  return <>{children}</>
}
