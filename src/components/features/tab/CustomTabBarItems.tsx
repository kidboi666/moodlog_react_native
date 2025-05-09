import {
  CalendarDays,
  FileChartColumnIncreasing,
  Home,
  Settings,
} from '@tamagui/lucide-icons'
import { memo } from 'react'

import { PressableButton } from '@/components/shared'

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

export const CalendarTab = memo(({ isTabActive, onPress }: TabButtonProps) => {
  return (
    <PressableButton
      color={isTabActive ? '$color11' : '$color9'}
      bg={isTabActive ? '$backgroundStrong' : '$color5'}
      icon={CalendarDays}
      onPress={() => onPress('/calendar')}
    />
  )
})

export const StatisticTab = memo(({ isTabActive, onPress }: TabButtonProps) => {
  return (
    <PressableButton
      color={isTabActive ? '$color11' : '$color9'}
      bg={isTabActive ? '$backgroundStrong' : '$color5'}
      icon={FileChartColumnIncreasing}
      onPress={() => onPress('/statistic')}
    />
  )
})

export const SettingTab = memo(({ isTabActive, onPress }: TabButtonProps) => {
  return (
    <PressableButton
      color={isTabActive ? '$color11' : '$color9'}
      bg={isTabActive ? '$backgroundStrong' : '$color5'}
      icon={Settings}
      onPress={() => onPress('/setting')}
    />
  )
})
