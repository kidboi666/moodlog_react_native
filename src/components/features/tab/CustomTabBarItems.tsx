import {
  CalendarDays,
  FileChartColumnIncreasing,
  Home,
  Settings,
} from '@tamagui/lucide-icons'
import { ReactNode, memo } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useTheme } from 'tamagui'

interface TabButtonProps {
  isTabActive: boolean
  onPress: (route: string) => void
  accessibilityLabel?: string
}
const iconColor = (isTabActive: boolean) =>
  isTabActive ? '$color11' : '$color10'

function _HomeTab({
  isTabActive,
  onPress,
  accessibilityLabel,
}: TabButtonProps) {
  return (
    <TabButton
      isTabActive={isTabActive}
      onPress={() => onPress('/')}
      accessibilityLabel={accessibilityLabel || 'Home'}
    >
      <Home color={iconColor(isTabActive)} />
    </TabButton>
  )
}
export const HomeTab = memo(_HomeTab)
HomeTab.displayName = 'HomeTab'

function _EntriesTab({
  isTabActive,
  onPress,
  accessibilityLabel,
}: TabButtonProps) {
  return (
    <TabButton
      isTabActive={isTabActive}
      onPress={() => onPress('/entries')}
      accessibilityLabel={accessibilityLabel || 'Journal Entries'}
    >
      <CalendarDays color={iconColor(isTabActive)} />
    </TabButton>
  )
}
export const EntriesTab = memo(_EntriesTab)
EntriesTab.displayName = 'EntriesTab'

function _StatisticTab({
  isTabActive,
  onPress,
  accessibilityLabel,
}: TabButtonProps) {
  return (
    <TabButton
      isTabActive={isTabActive}
      onPress={() => onPress('/statistic')}
      accessibilityLabel={accessibilityLabel || 'Statistics'}
    >
      <FileChartColumnIncreasing color={iconColor(isTabActive)} />
    </TabButton>
  )
}
export const StatisticTab = memo(_StatisticTab)
StatisticTab.displayName = 'StatisticTab'

function _SettingTab({
  isTabActive,
  onPress,
  accessibilityLabel,
}: TabButtonProps) {
  return (
    <TabButton
      isTabActive={isTabActive}
      onPress={() => onPress('/setting')}
      accessibilityLabel={accessibilityLabel || 'Settings'}
    >
      <Settings color={iconColor(isTabActive)} />
    </TabButton>
  )
}
export const SettingTab = memo(_SettingTab)
SettingTab.displayName = 'SettingTab'

interface TabButtonBaseProps {
  onPress: () => void
  isTabActive: boolean
  children: ReactNode
  accessibilityLabel: string
}

function TabButton({
  onPress,
  isTabActive,
  children,
  accessibilityLabel,
}: TabButtonBaseProps) {
  const theme = useTheme()

  const animatedContainerStyle = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(
        isTabActive ? theme.backgroundStrong.val : theme.color5.val,
        { duration: 300 },
      ),
    }),
    [isTabActive, theme],
  )

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onPress}
        android_ripple={{
          color: 'rgba(0, 0, 0, 0.3)',
          borderless: true,
          radius: 28,
        }}
        accessibilityRole='button'
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ selected: isTabActive }}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        {children}
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 48,
    minHeight: 48,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
})
