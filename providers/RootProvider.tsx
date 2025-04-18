import { PortalProvider, type TamaguiProviderProps } from 'tamagui'

import { TamaguiBaseProvider } from './TamaguiProvider'
import { ThemeProvider } from './ThemeProvider'
import { TamaguiToastProvider } from './ToastProvider'

export const RootProvider = ({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) => {
  return (
    <TamaguiBaseProvider {...rest}>
      <ThemeProvider>
        <TamaguiToastProvider>
          <PortalProvider>{children}</PortalProvider>
        </TamaguiToastProvider>
      </ThemeProvider>
    </TamaguiBaseProvider>
  )
}
