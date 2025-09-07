import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'react-native-paper'

export default function SettingsLayout() {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        gestureEnabled: true,
        headerStyle: { backgroundColor: theme.colors.background },
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      {screens.map(({ name, title }) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{
            title: t(title),
          }}
        />
      ))}
    </Stack>
  )
}

const screens = [
  { name: 'index', title: 'settings.title' },
  { name: 'dev', title: 'settings.dev.title' },
  { name: 'theme', title: 'settings.theme.title' },
  { name: 'language', title: 'settings.language.title' },
  { name: 'time_format', title: 'settings.timeFormat.title' },
  { name: 'bug_report', title: 'settings.bugReport.title' },
  { name: 'qna', title: 'settings.qna.title' },
]
