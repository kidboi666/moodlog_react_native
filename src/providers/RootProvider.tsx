import { QueryClientProvider } from '@tanstack/react-query'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { PropsWithChildren, useEffect } from 'react'
import Toast from 'react-native-toast-message'

import { queryClient } from '@/lib'
import { seedDatabase } from '../../db/seed'
import { sqliteDb } from '../../db/sqlite'
import migrations from '../../db/sqlite/drizzle/migrations'
import { UnifiedThemeProvider } from './UnifiedThemeProvider'

export const RootProvider = ({ children }: PropsWithChildren) => {
  useMigrations(sqliteDb, migrations)

  useEffect(() => {
    seedDatabase()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <UnifiedThemeProvider>
        {children}
        <Toast />
      </UnifiedThemeProvider>
    </QueryClientProvider>
  )
}
