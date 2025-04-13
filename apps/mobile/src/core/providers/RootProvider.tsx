import { PortalProvider, type TamaguiProviderProps } from 'tamagui'

import { ThemeProvider } from '@/core/store/theme.store'
import { TamaguiBaseProvider } from './TamaguiProvider'
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
