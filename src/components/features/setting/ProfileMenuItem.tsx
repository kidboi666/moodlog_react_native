import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { H3 } from '@/components/shared'

interface Props {
  title: string
  value: string | number | null | undefined
}

export function ProfileMenuItem({ title, value }: Props) {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <H3>{t(title)}</H3>
      <Text>{value ?? '-'}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
})
