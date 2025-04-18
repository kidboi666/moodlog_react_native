import { memo } from 'react'
import { StatusBar as RNStatusBar } from 'react-native'

import type { Theme } from '@/types'

interface Props {
  resolvedTheme?: Omit<Theme, 'system'>
}

export const StatusBar = memo(({ resolvedTheme }: Props) => {
  return (
    <RNStatusBar
      backgroundColor='transparent'
      translucent
      barStyle={resolvedTheme === 'dark' ? 'light-content' : 'dark-content'}
    />
  )
})
