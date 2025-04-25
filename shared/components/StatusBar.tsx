import { memo } from 'react'
import { StatusBar as RNStatusBar } from 'react-native'

import { Theme } from '@/shared/types'

interface Props {
  resolvedTheme?: Omit<Theme, Theme.SYSTEM>
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
