import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { useThemedStyles } from '@/hooks'
import { MoodLevel } from '@/types'

interface Props {
  name?: string
  level?: MoodLevel
  color?: string
  percentage: number
}

export function ChartItem({ name, level, color, percentage }: Props) {
  const { t } = useTranslation()
  const widthValue = useSharedValue(0)
  const animatedStyles = useAnimatedStyle(() => ({
    width: widthValue.value,
  }))

  useEffect(() => {
    if (percentage > 0) {
      setTimeout(() => {
        widthValue.value = withTiming(percentage, {
          duration: 2000,
        })
      }, 1000)
    }
  }, [percentage])

  if (!name || !level || !color) return null

  const themedStyles = useThemedStyles(({ tokens }) => ({
    item: {
      backgroundColor: color,
    },
    percentage: {
      color: tokens.neutral['900'],
    },
  }))

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyles, themedStyles.item]} />
      <Text>{t(`moods.levels.${level}`)}</Text>
      <Text style={[styles.percentage, themedStyles.percentage]}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
  },
  item: {
    height: 4,
    borderRadius: 16,
    width: '100%',
  },
  percentage: {
    marginTop: 2,
  },
})
