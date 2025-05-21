import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { PortalProvider, type TamaguiProviderProps } from 'tamagui'

import { queryClient } from '@/lib'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { seedDatabase } from '../../db/seed'
import { sqliteDb } from '../../db/sqlite'
import migrations from '../../db/sqlite/drizzle/migrations'
import { PaperProvider } from './PaperProvider'
import { TamaguiBaseProvider } from './TamaguiProvider'
import { ThemeProvider } from './ThemeProvider'
import { TamaguiToastProvider } from './ToastProvider'

export const RootProvider = ({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) => {
  useMigrations(sqliteDb, migrations)

  useEffect(() => {
    seedDatabase()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <TamaguiBaseProvider {...rest}>
          <ThemeProvider>
            <TamaguiToastProvider>
              <PortalProvider>{children}</PortalProvider>
            </TamaguiToastProvider>
          </ThemeProvider>
        </TamaguiBaseProvider>
      </PaperProvider>
    </QueryClientProvider>
  )
}
