import { PortalProvider, type TamaguiProviderProps } from 'tamagui'

import { DatabaseProvider } from './DatabaseProvider'
import { TamaguiBaseProvider } from './TamaguiProvider'
import { ThemeProvider } from './ThemeProvider'
import { TamaguiToastProvider } from './ToastProvider'

export const RootProvider = ({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) => {
  return (
    <DatabaseProvider>
      <TamaguiBaseProvider {...rest}>
        <ThemeProvider>
          <TamaguiToastProvider>
            <PortalProvider>{children}</PortalProvider>
          </TamaguiToastProvider>
        </ThemeProvider>
      </TamaguiBaseProvider>
    </DatabaseProvider>
  )
}
