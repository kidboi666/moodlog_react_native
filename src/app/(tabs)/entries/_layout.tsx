import { H3, PressableButton } from '@/components/shared'
import { useCalendar } from '@/hooks'
import { convertMonthString } from '@/utils'
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { Stack, useRouter } from 'expo-router'
import { useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XStack, useTheme } from 'tamagui'

export default function Layout() {
  const theme = useTheme()
  const router = useRouter()
  const { selectedMonth, onSelectedMonthChange, selectedYear } = useCalendar()

  const handleLeftPress = useCallback(() => {
    const monthString = convertMonthString(selectedMonth, 'prev')
    onSelectedMonthChange(monthString)
  }, [onSelectedMonthChange, selectedMonth])

  const handleRightPress = useCallback(() => {
    const monthString = convertMonthString(selectedMonth, 'next')
    onSelectedMonthChange(monthString)
  }, [onSelectedMonthChange, selectedMonth])

  const selectedMonthToRender = selectedMonth.replace('-', '.')

  useEffect(() => {
    router.setParams({ selectedYear, selectedMonth })
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          header: () => (
            <XStack justify='space-between' items='center' width='100%' py='$2'>
              <PressableButton icon={ArrowLeft} onPress={handleLeftPress} />
              <H3>{selectedMonthToRender}</H3>
              <PressableButton icon={ArrowRight} onPress={handleRightPress} />
            </XStack>
          ),
          contentStyle: {
            backgroundColor: theme.background.val,
          },
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name='index' />
      </Stack>
    </SafeAreaView>
  )
}
