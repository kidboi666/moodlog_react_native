import { useColors } from '@/hooks'
import { StyleSheet, View } from 'react-native'

interface Props {
  page: number
  totalPage: number
  show: boolean
}

export function PaginationDot({ show, page, totalPage }: Props) {
  if (!show) {
    return null
  }
  const { colors } = useColors()

  return (
    <View style={styles.box}>
      {Array.from({ length: totalPage }, (_, i) => (
        <View
          style={[
            styles.dot,
            {
              backgroundColor:
                i === page ? colors.surface.primary : colors.surface.inverse,
            },
          ]}
          key={i}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    paddingBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
  },
})
