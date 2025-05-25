import { type Href, useRouter } from 'expo-router'
import { Fragment, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Divider, List, Text, useTheme } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { H1, ScreenView } from '@/components/shared'
import { SafeAreaView } from 'react-native-safe-area-context'

const devSection = __DEV__
  ? {
      title: 'settings.dev.options',
      items: [
        {
          label: 'settings.dev.title',
          icon: 'laptop',
          route: '/setting/dev',
        },
      ],
    }
  : null

const configSection = {
  title: 'settings.menuTitle.config',
  items: [
    {
      label: 'settings.theme.title',
      icon: 'theme-light-dark',
      route: '/setting/theme',
    },
    {
      label: 'settings.language.title',
      icon: 'earth',
      route: '/setting/language',
    },
    {
      label: 'settings.timeFormat.title',
      icon: 'clock-outline',
      route: '/setting/time_format',
    },
  ],
}

const supportSection = {
  title: 'settings.menuTitle.report',
  items: [
    {
      label: 'settings.bugReport.title',
      icon: 'bug',
      route: '/setting/bug_report',
    },
    {
      label: 'settings.qna.title',
      icon: 'help-circle',
      route: '/setting/qna',
    },
  ],
}

const loginSection = {
  title: 'settings.menuTitle.login',
  items: [
    {
      label: 'settings.profile.title',
      icon: 'account',
      route: '/setting/profile',
    },
  ],
}

const AnimatedScreenView = Animated.createAnimatedComponent(ScreenView)

interface SettingSection {
  title: string
  items: {
    label: string
    icon: string
    route?: any
    action?: () => void
  }[]
}

export default function SettingsScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const router = useRouter()

  const handleRouteChange = useCallback(
    (route: Href) => {
      router.push(route)
    },
    [router],
  )

  const sections = [
    devSection,
    loginSection,
    configSection,
    supportSection,
  ].filter(Boolean) as SettingSection[]

  return (
    <AnimatedScreenView
      entering={FadeIn.duration(800)}
      padded
      withScroll
      style={styles.container}
    >
      <View style={styles.contentBox}>
        {sections.map(({ title, items }) => (
          <List.Section key={title}>
            <List.Subheader>{t(title)}</List.Subheader>
            {items.map(menu => (
              <Fragment key={menu.label}>
                <List.Item
                  key={menu.label}
                  title={t(menu.label)}
                  style={styles.item}
                  left={() => <List.Icon icon={menu.icon} />}
                  onPress={() => handleRouteChange(menu.route)}
                />
              </Fragment>
            ))}
          </List.Section>
        ))}
      </View>
      <View style={styles.copyrightBox}>
        <Text>© 2025 Moodlog. All rights reserved.</Text>
      </View>
    </AnimatedScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  contentBox: {
    gap: 12,
  },
  copyrightBox: {
    alignItems: 'center',
    marginTop: 12,
  },
  item: {
    marginLeft: 8,
  },
})
