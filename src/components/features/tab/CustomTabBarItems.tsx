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

function _HomeTab({ isTabActive, onPress }: TabButtonProps) {
  return (
    <PressableButton
      color={isTabActive ? '$color11' : '$color9'}
      bg={isTabActive ? '$backgroundStrong' : '$color5'}
      icon={Home}
      onPress={() => onPress('/')}
    />
  )
}

export const HomeTab = memo(_HomeTab)

HomeTab.displayName = 'HomeTab'

function _CalendarTab({ isTabActive, onPress }: TabButtonProps) {
  return (
    <PressableButton
      color={isTabActive ? '$color11' : '$color9'}
      bg={isTabActive ? '$backgroundStrong' : '$color5'}
      icon={CalendarDays}
      onPress={() => onPress('/calendar')}
    />
  )
}

export const CalendarTab = memo(_CalendarTab)

CalendarTab.displayName = 'CalendarTab'

function _StatisticTab({ isTabActive, onPress }: TabButtonProps) {
  return (
    <PressableButton
      color={isTabActive ? '$color11' : '$color9'}
      bg={isTabActive ? '$backgroundStrong' : '$color5'}
      icon={FileChartColumnIncreasing}
      onPress={() => onPress('/statistic')}
    />
  )
}

export const StatisticTab = memo(_StatisticTab)

StatisticTab.displayName = 'StatisticTab'

function _SettingTab({ isTabActive, onPress }: TabButtonProps) {
  return (
    <PressableButton
      color={isTabActive ? '$color11' : '$color9'}
      bg={isTabActive ? '$backgroundStrong' : '$color5'}
      icon={Settings}
      onPress={() => onPress('/setting')}
    />
  )
}

export const SettingTab = memo(_SettingTab)

SettingTab.displayName = 'SettingTab'
