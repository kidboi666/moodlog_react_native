import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { useColorScheme } from 'react-native'

import config from '../../../tamagui.config'

export const TamaguiBaseProvider = ({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) => {
  const colorScheme = useColorScheme()

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'} {...rest}>
      {children}
    </TamaguiProvider>
  )
}
