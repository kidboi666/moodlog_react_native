import { H1, H2 } from '@/components/shared'
import { Stack, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { IconButton, useTheme } from 'react-native-paper'

const screens = [
  { name: 'index', title: 'settings.title' },
  { name: 'theme', title: 'settings.theme.title' },
  { name: 'language', title: 'settings.language.title' },
  { name: 'time_format', title: 'settings.timeFormat.title' },
  { name: 'profile', title: 'settings.profile.title' },
  { name: 'bug_report', title: 'settings.bugReport.title' },
  { name: 'qna', title: 'settings.qna.title' },
]

export default function SettingsLayout() {
  const theme = useTheme()
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <IconButton icon='arrow-left' onPress={() => router.back()} />
        ),
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
            headerTitle: () => <H2>{t(title)}</H2>,
          }}
        />
      ))}
    </Stack>
  )
}
