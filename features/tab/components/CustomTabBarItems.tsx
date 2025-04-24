import {
  CalendarDays,
  FileChartColumnIncreasing,
  Home,
  Settings,
} from '@tamagui/lucide-icons'
import { memo } from 'react'

import { PressableButton } from '@/shared/components'

interface TabButtonProps {
  isTabActive: boolean
  onPress: (route: string) => void
}

export const HomeTab = memo(({ isTabActive, onPress }: TabButtonProps) => {
  return (
    <PressableButton
      color={isTabActive ? '$color11' : '$color9'}
      bg={isTabActive ? '$backgroundStrong' : '$color5'}
      icon={Home}
      onPress={() => onPress('/')}
    />
  )
})

export const EntriesTab = memo(({ isTabActive, onPress }: TabButtonProps) => {
  return (
    <PressableButton
      color={isTabActive ? '$color11' : '$color9'}
      bg={isTabActive ? '$backgroundStrong' : '$color5'}
      icon={CalendarDays}
      onPress={() => onPress('/entries')}
    />
  )
})

export const StatisticsTab = memo(
  ({ isTabActive, onPress }: TabButtonProps) => {
    return (
      <PressableButton
        color={isTabActive ? '$color11' : '$color9'}
        bg={isTabActive ? '$backgroundStrong' : '$color5'}
        icon={FileChartColumnIncreasing}
        onPress={() => onPress('/statistics')}
      />
    )
  },
)

export const SettingsTab = memo(({ isTabActive, onPress }: TabButtonProps) => {
  return (
    <PressableButton
      color={isTabActive ? '$color11' : '$color9'}
      bg={isTabActive ? '$backgroundStrong' : '$color5'}
      icon={Settings}
      onPress={() => onPress('/settings')}
    />
  )
})
