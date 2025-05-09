import { SQLiteProvider } from 'expo-sqlite'
import { PropsWithChildren } from 'react'

export const DatabaseProvider = ({ children }: PropsWithChildren) => {
  return (
    <SQLiteProvider databaseName='moodlog.db' useSuspense>
      {children}
    </SQLiteProvider>
  )
}
