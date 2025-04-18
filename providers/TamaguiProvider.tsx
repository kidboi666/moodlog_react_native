import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'

import { config } from '@/configs'

export const TamaguiBaseProvider = ({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) => {
  return (
    <TamaguiProvider config={config} {...rest}>
      {children}
    </TamaguiProvider>
  )
}
