import { tamaguiConfig } from '@/configs'
import { createTamagui } from 'tamagui'

// you usually export this from a tamagui.config.ts file
const config = createTamagui(tamaguiConfig)

type Conf = typeof config

// make imports typed
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default config
