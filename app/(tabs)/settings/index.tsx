import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import {
  AlignLeft,
  BugPlay,
  Clock,
  Computer,
  Globe,
  HelpCircle,
  LogOut,
  Moon,
  Type,
  User,
} from '@tamagui/lucide-icons'
import { type Href, useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, YStack } from 'tamagui'

import { useBottomSheet } from '@/store'
import { AUTH_SNAP_POINTS, LOGOUT_SNAP_POINTS } from 'shared/constants'
import { BottomSheetType } from 'shared/types'

import { NavigationSettingItem } from '@/features/setting/components/NavigationSettingItem'
import { SettingsContainer } from '@/features/setting/components/SettingsContainer'
import { BaseText } from '@/shared/components/BaseText'
import { H1 } from '@/shared/components/Heading'
import { PressableButton } from '@/shared/components/PressableButton'
import { ViewContainer } from '@/shared/components/ViewContainer'

type SettingSection = {
  title: string
  items: {
    label: string
    icon: JSX.Element
    route?: Href
    action?: () => void
  }[]
}

const devSection = __DEV__
  ? {
      title: 'settings.dev.options',
      items: [
        {
          label: 'settings.dev.title',
          icon: <Computer size='$1' />,
          route: '/settings/dev',
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
      route: '/settings/theme',
    },
    {
      label: 'settings.language.title',
      icon: <Globe size='$1' />,
      route: '/settings/language',
    },
    {
      label: 'settings.font.title',
      icon: <Type size='$1' />,
      route: '/settings/font',
    },
    {
      label: 'settings.fontSize.title',
      icon: <AlignLeft size='$1' />,
      route: '/settings/font_size',
    },
    {
      label: 'settings.timeFormat.title',
      icon: <Clock size='$1' />,
      route: '/settings/time_format',
    },
  ],
}

const supportSection = {
  title: 'settings.menuTitle.report',
  items: [
    {
      label: 'settings.bugReport.title',
      icon: <BugPlay size='$1' />,
      route: '/settings/bug_report',
    },
    {
      label: 'settings.qna.title',
      icon: <HelpCircle size='$1' />,
      route: '/settings/qna',
    },
  ],
}

export default function SettingsScreen() {
  const { t } = useTranslation()
  const router = useRouter()
  const { showBottomSheet, hideBottomSheet } = useBottomSheet()
  const [session, setSession] = useState<Session | null>(null)

  const handleRouteChange = useCallback(
    (route: Href) => {
      router.push(route)
    },
    [router],
  )

  const handleLogoutConfirm = useCallback(() => {
    showBottomSheet(BottomSheetType.LOGOUT, LOGOUT_SNAP_POINTS, {
      hideBottomSheet,
    })
  }, [showBottomSheet, hideBottomSheet])

  const handleLogin = useCallback(() => {
    showBottomSheet(BottomSheetType.SIGN_IN, AUTH_SNAP_POINTS)
  }, [showBottomSheet])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const renderSettingItem = useCallback(
    ({ label, icon, route, action }: SettingSection['items'][0]) => {
      const onPress = route ? () => handleRouteChange(route) : action

      return (
        <NavigationSettingItem
          key={label}
          label={t(label)}
          icon={icon}
          onRouteChange={onPress || (() => {})}
        />
      )
    },
    [handleRouteChange],
  )

  const renderSettingSection = useCallback(
    ({ title, items }: SettingSection) => (
      <SettingsContainer key={title} title={t(title)}>
        {items.map(renderSettingItem)}
      </SettingsContainer>
    ),
    [renderSettingItem],
  )

  const loginSection = {
    title: 'settings.menuTitle.login',
    items: [
      {
        label: session?.user
          ? 'settings.profile.title'
          : 'settings.profile.guest',
        icon: <User size='$1' />,
        route: session?.user ? '/settings/profile' : undefined,
        action: !session?.user ? handleLogin : undefined,
      },
    ],
  }

  const sections = [
    devSection,
    loginSection,
    configSection,
    supportSection,
  ].filter(Boolean) as SettingSection[]

  return (
    <ScrollView>
      <ViewContainer edges={['top']} padded gap='$4'>
        <H1>{t('settings.title')}</H1>
        <YStack gap='$6'>
          {sections.map(renderSettingSection)}

          {session?.user && (
            <PressableButton
              onPress={handleLogoutConfirm}
              chromeless
              bg='transparent'
              color='$red10'
            >
              {t('auth.logout')}
              <LogOut color='$red10' size='$1' />
            </PressableButton>
          )}
        </YStack>

        <YStack items='center' mt='$4'>
          <BaseText color='$color11'>
            © 2025 Moodlog. All rights reserved.
          </BaseText>
        </YStack>
      </ViewContainer>
    </ScrollView>
  )
}
