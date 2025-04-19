import {
  AlignLeft,
  BugPlay,
  Clock,
  Computer,
  Globe,
  HelpCircle,
  LogOut,
  Moon,
  SmilePlus,
  Type,
  User,
} from '@tamagui/lucide-icons'
import { type Href, useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'tamagui'

import { AUTH_SNAP_POINTS, LOGOUT_SNAP_POINTS } from '@/constants'
import { useBottomSheet } from '@/store'
import { BottomSheetType } from '@/types'

import { NavigationSettingItem } from '@/components/features/settings/NavigationSettingItem'
import { SettingsContainer } from '@/components/features/settings/SettingsContainer'
import { BaseText } from '@/components/shared/BaseText'
import { H1 } from '@/components/shared/Heading'
import { supabase } from '@/lib/supabase'
import * as S from '@/styles/screens/settings/Settings.styled'
import { Session } from '@supabase/supabase-js'

export default function Screen() {
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
  }, [])

  return (
    <ScrollView>
      <S.ViewContainer>
        <H1>{t('settings.title')}</H1>
        <S.ItemContainer>
          {__DEV__ && (
            <SettingsContainer title={t('settings.dev.options')}>
              <NavigationSettingItem
                label={t('settings.dev.title')}
                href='/settings/dev'
                onRouteChange={handleRouteChange}
                icon={<Computer size='$1' />}
              />
            </SettingsContainer>
          )}
          <SettingsContainer title={t('settings.menuTitle.login')}>
            {session?.user ? (
              <NavigationSettingItem
                label={t('settings.profile.title')}
                href={'/settings/profile' as any}
                onRouteChange={handleRouteChange}
                icon={<User size='$1' />}
              />
            ) : (
              <S.SignInButton onPress={handleLogin}>
                <User size='$1' />
                <S.SignInText>{t('settings.profile.guest')}</S.SignInText>
              </S.SignInButton>
            )}
          </SettingsContainer>

          <SettingsContainer title={t('settings.menuTitle.config')}>
            <NavigationSettingItem
              label={t('settings.theme.title')}
              href='/settings/theme'
              onRouteChange={handleRouteChange}
              icon={<Moon size='$1' />}
            />
            <NavigationSettingItem
              label={t('settings.language.title')}
              onRouteChange={handleRouteChange}
              href='/settings/language'
              icon={<Globe size='$1' />}
            />
            <NavigationSettingItem
              label={t('settings.font.title')}
              onRouteChange={handleRouteChange}
              href={'/settings/font' as any}
              icon={<Type size='$1' />}
            />
            <NavigationSettingItem
              label={t('settings.fontSize.title')}
              onRouteChange={handleRouteChange}
              href='/settings/font_size'
              icon={<AlignLeft size='$1' />}
            />
            <NavigationSettingItem
              label={t('settings.timeFormat.title')}
              onRouteChange={handleRouteChange}
              href='/settings/time_format'
              icon={<Clock size='$1' />}
            />
            <NavigationSettingItem
              label={t('settings.emotionDisplay.title')}
              onRouteChange={handleRouteChange}
              href={'/settings/emotion_display' as any}
              icon={<SmilePlus size='$1' />}
            />
          </SettingsContainer>

          <SettingsContainer title={t('settings.menuTitle.report')}>
            <NavigationSettingItem
              label={t('settings.bugReport.title')}
              onRouteChange={handleRouteChange}
              href='/settings/bug_report'
              icon={<BugPlay size='$1' />}
            />
            <NavigationSettingItem
              label={t('settings.qna.title')}
              onRouteChange={handleRouteChange}
              href='/settings/qna'
              icon={<HelpCircle size='$1' />}
            />
          </SettingsContainer>

          {session?.user && (
            <S.LogoutButton onPress={handleLogoutConfirm} chromeless>
              {t('auth.logout')}
              <LogOut color='$red10' size='$1' />
            </S.LogoutButton>
          )}
        </S.ItemContainer>

        <S.CopyrightContainer>
          <BaseText color='$color11'>
            © 2025 Moodlog. All rights reserved.
          </BaseText>
        </S.CopyrightContainer>
      </S.ViewContainer>
    </ScrollView>
  )
}
