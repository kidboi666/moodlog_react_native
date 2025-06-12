import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { List, useTheme } from 'react-native-paper'

interface Props {
  title: string
  value: string | number | null | undefined
}

export function ProfileMenuItem({ title, value }: Props) {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <List.Section>
      <List.Subheader
        style={[styles.subheader, { color: colors.onSurfaceDisabled }]}
      >
        {t(title)}
      </List.Subheader>
      <List.Item title={value || '-'} />
    </List.Section>
  )
}

const styles = StyleSheet.create({
  subheader: {
    paddingVertical: 0,
  },
})
