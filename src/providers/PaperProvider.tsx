import { colorThemes } from '@/constants'
import { PropsWithChildren } from 'react'
import { useColorScheme } from 'react-native'
import { PaperProvider as RNPaperProvider } from 'react-native-paper'

export function PaperProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme()
  const mode = colorScheme === 'dark' ? 'dark' : 'light'

  return (
    <RNPaperProvider theme={colorThemes.gray[mode]}>{children}</RNPaperProvider>
  )
}
