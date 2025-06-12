import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

interface Props {
  page: number
  totalPage: number
  show: boolean
}

export function PaginationDot({ show, page, totalPage }: Props) {
  const theme = useTheme()
  if (!show) {
    return null
  }

  return (
    <View style={styles.box}>
      {Array.from({ length: totalPage }, (_, i) => (
        <View
          style={[
            styles.dot,
            {
              backgroundColor:
                i === page
                  ? theme.colors.surface
                  : theme.colors.surfaceDisabled,
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
