import { useTranslation } from 'react-i18next'
import { List } from 'react-native-paper'

interface Props {
  title: string
  value: string | number | null | undefined
}

export function ProfileMenuItem({ title, value }: Props) {
  const { t } = useTranslation()

  return (
    <List.Section>
      <List.Subheader>{t(title)}</List.Subheader>
      <List.Item title={value || '-'} />
    </List.Section>
  )
}
