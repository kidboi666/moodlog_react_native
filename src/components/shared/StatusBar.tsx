import { memo } from 'react'
import { StatusBar as RNStatusBar } from 'react-native'

import { Theme } from '@/types'

interface Props {
  resolvedTheme?: Omit<Theme, Theme.SYSTEM>
}

function _StatusBar({ resolvedTheme }: Props) {
  return (
    <RNStatusBar
      backgroundColor='transparent'
      translucent
      barStyle={resolvedTheme === 'dark' ? 'light-content' : 'dark-content'}
    />
  )
}

export const StatusBar = memo(_StatusBar)

StatusBar.displayName = 'StatusBar'
