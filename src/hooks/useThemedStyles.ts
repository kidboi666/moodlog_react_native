import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { useColors } from './useColors'

export const useThemedStyles = <T extends Record<string, any>>(
  createStyles: (colors: ReturnType<typeof useColors>) => T,
) => {
  const colorSystem = useColors()

  return useMemo(() => {
    const styles = createStyles(colorSystem)
    return StyleSheet.create(styles)
  }, [colorSystem])
}
