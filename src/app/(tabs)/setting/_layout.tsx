import { H1, H2 } from '@/components/shared'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'react-native-paper'

const screens = [
  { name: 'index', title: 'settings.title' },
  { name: 'theme', title: 'settings.theme.title' },
  { name: 'language', title: 'settings.language.title' },
  { name: 'time_format', title: 'settings.time_format.title' },
  { name: 'profile', title: 'settings.profile.title' },
  { name: 'bug_report', title: 'settings.bug_report.title' },
  { name: 'qna', title: 'settings.qna.title' },
]

export default function SettingsLayout() {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      {screens.map(({ name, title }) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{
            headerShadowVisible: false,
            headerLeft: () => null,
            headerTitle: () => <H2>{t(title)}</H2>,
          }}
        />
      ))}
    </Stack>
  )
}
