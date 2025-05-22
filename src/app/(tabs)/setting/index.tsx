import { type Href, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { List } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { BaseText, H1, ScreenView } from '@/components/shared'

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
      label: 'settings.font.title',
      icon: 'format-font',
      route: '/setting/font',
    },
    {
      label: 'settings.fontSize.title',
      icon: 'format-size',
      route: '/setting/font_size',
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

type SettingSection = {
  title: string
  items: {
    label: string
    icon: string
    route?: any
    action?: () => void
  }[]
}

const AnimatedScreenView = Animated.createAnimatedComponent(ScreenView)

export default function SettingsScreen() {
  const { t } = useTranslation()
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
      withScroll
      edges={['top']}
      padded
      style={styles.container}
      entering={FadeIn.duration(800)}
    >
      <H1>{t('settings.title')}</H1>
      <View style={styles.contentBox}>
        {sections.map(({ title, items }) => (
          <List.Section key={title}>
            <List.Subheader>{t(title)}</List.Subheader>
            {items.map(menu => (
              <List.Item
                key={menu.label}
                title={t(menu.label)}
                left={() => <List.Icon icon={menu.icon} color='black' />}
                onPress={() => handleRouteChange(menu.route)}
              />
            ))}
          </List.Section>
        ))}
      </View>
      <View style={styles.copyrightBox}>
        <BaseText>© 2025 Moodlog. All rights reserved.</BaseText>
      </View>
    </AnimatedScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  contentBox: {
    gap: 20,
  },
  copyrightBox: {
    alignItems: 'center',
    marginTop: 12,
  },
})
