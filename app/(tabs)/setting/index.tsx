import {
  AlignLeft,
  BugPlay,
  Clock,
  Computer,
  Globe,
  HelpCircle,
  Moon,
  Type,
  User,
} from '@tamagui/lucide-icons'
import { type Href, useRouter } from 'expo-router'
import { ReactElement, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, YStack, styled } from 'tamagui'

import {
  NavigationSettingItem,
  SettingsContainer,
} from '@/features/setting/components'
import { BaseText, H1, ViewContainer } from '@/shared/components'

const devSection = __DEV__
  ? {
      title: 'settings.dev.options',
      items: [
        {
          label: 'settings.dev.title',
          icon: <Computer size='$1' />,
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
      icon: <Moon size='$1' />,
      route: '/setting/theme',
    },
    {
      label: 'settings.language.title',
      icon: <Globe size='$1' />,
      route: '/setting/language',
    },
    {
      label: 'settings.font.title',
      icon: <Type size='$1' />,
      route: '/setting/font',
    },
    {
      label: 'settings.fontSize.title',
      icon: <AlignLeft size='$1' />,
      route: '/setting/font_size',
    },
    {
      label: 'settings.timeFormat.title',
      icon: <Clock size='$1' />,
      route: '/setting/time_format',
    },
  ],
}

const supportSection = {
  title: 'settings.menuTitle.report',
  items: [
    {
      label: 'settings.bugReport.title',
      icon: <BugPlay size='$1' />,
      route: '/setting/bug_report',
    },
    {
      label: 'settings.qna.title',
      icon: <HelpCircle size='$1' />,
      route: '/setting/qna',
    },
  ],
}

const loginSection = {
  title: 'settings.menuTitle.login',
  items: [
    {
      label: 'settings.profile.title',
      icon: <User size='$1' />,
      route: '/setting/profile',
    },
  ],
}

type SettingSection = {
  title: string
  items: {
    label: string
    icon: ReactElement
    route?: any
    action?: () => void
  }[]
}

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
    <ScrollView>
      <Container>
        <H1>{t('settings.title')}</H1>
        <ContentYStack>
          {sections.map(({ title, items }) => (
            <SettingsContainer key={title} title={t(title)}>
              {items.map(menu => (
                <NavigationSettingItem
                  key={menu.label}
                  label={t(menu.label)}
                  icon={menu.icon}
                  onRouteChange={() => handleRouteChange(menu.route)}
                />
              ))}
            </SettingsContainer>
          ))}
        </ContentYStack>

        <CopyrightYStack>
          <CopyrightText>© 2025 Moodlog. All rights reserved.</CopyrightText>
        </CopyrightYStack>
      </Container>
    </ScrollView>
  )
}

const Container = styled(ViewContainer, {
  edges: ['top'],
  padded: true,
  gap: '$4',
})

const ContentYStack = styled(YStack, {
  gap: '$6',
})

const CopyrightYStack = styled(YStack, {
  items: 'center',
  mt: '$4',
})

const CopyrightText = styled(BaseText, {
  color: '$color11',
})
