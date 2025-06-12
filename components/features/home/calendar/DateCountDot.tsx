import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

interface Props {
  journalCount?: number
  isSelected?: boolean
  variant?: 'default' | 'contained'
}

export function DateCountDot({
  journalCount,
  isSelected,
  variant = 'default',
}: Props) {
  const theme = useTheme()
  const themedStyles = useMemo(
    () => ({
      contained: {
        backgroundColor:
          variant === 'contained'
            ? isSelected
              ? theme.colors.onSurface
              : theme.colors.surface
            : isSelected
              ? theme.colors.surface
              : theme.colors.onSurface,
      },
    }),
    [theme, isSelected, variant],
  )
  if (!journalCount) return null
  return (
    <View style={styles.container}>
      {Array.from({ length: journalCount }, (_, i) => {
        if (i >= 3) return null
        return (
          <View
            style={[styles.dot, themedStyles.contained]}
            key={`${i}-${journalCount}`}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    gap: 2,
    bottom: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    bottom: -8,
  },
})
