import { QueryClientProvider } from '@tanstack/react-query'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { PropsWithChildren } from 'react'
import Toast from 'react-native-toast-message'

import { sqliteDb } from '@/db/sqlite'
import migrations from '@/db/sqlite/drizzle/migrations'
import { queryClient } from '@/lib'
import { UnifiedThemeProvider } from './UnifiedThemeProvider'

export const RootProvider = ({ children }: PropsWithChildren) => {
  useMigrations(sqliteDb, migrations)

  return (
    <UnifiedThemeProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toast />
      </QueryClientProvider>
    </UnifiedThemeProvider>
  )
}
