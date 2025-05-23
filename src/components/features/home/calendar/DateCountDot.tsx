import { useThemedStyles } from '@/hooks'
import { StyleSheet, View } from 'react-native'

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
  if (!journalCount) return null
  const themedStyles = useThemedStyles(({ tokens }) => ({
    contained: {
      backgroundColor:
        variant === 'contained'
          ? isSelected
            ? tokens.neutral['950']
            : tokens.neutral['100']
          : isSelected
            ? tokens.neutral['950']
            : tokens.neutral['100'],
    },
  }))
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
