import {
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
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'tamagui'

import { NavigationSettingItem } from '@/core/components/features/settings/NavigationSettingItem'
import { SettingsContainer } from '@/core/components/features/settings/SettingsContainer'
import { BaseText } from '@/core/components/shared/BaseText'
import { H1 } from '@/core/components/shared/Heading'
import { AUTH_SNAP_POINTS, LOGOUT_SNAP_POINTS } from '@/core/constants/size'
import { useAuth } from '@/core/store/auth.store'
import { useBottomSheet } from '@/core/store/bottom-sheet.store'
import * as S from '@/styles/screens/settings/Settings.styled'
import { BottomSheetType } from '@/types/bottom-sheet.types'

export default function Screen() {
  const { t } = useTranslation()
  const router = useRouter()
  const isAuthenticated = useAuth(state => state.isAuthenticated)
  const logout = useAuth(state => state.logout)
  const { showBottomSheet, hideBottomSheet } = useBottomSheet()

  const handleRouteChange = useCallback(
    (route: Href) => {
      router.push(route)
    },
    [router],
  )

  const handleLogoutConfirm = useCallback(() => {
    showBottomSheet(BottomSheetType.LOGOUT, LOGOUT_SNAP_POINTS, {
      onLogout: () => {
        logout()
        router.replace('/(tabs)')
      },
      hideBottomSheet,
    })
  }, [showBottomSheet, logout, router, hideBottomSheet])

  const handleLogin = useCallback(() => {
    showBottomSheet(BottomSheetType.SIGN_IN, AUTH_SNAP_POINTS)
  }, [showBottomSheet])

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
            {isAuthenticated ? (
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
              label={t('settings.timeFormat.title')}
              onRouteChange={handleRouteChange}
              href='/settings/time_format'
              icon={<Clock size='$1' />}
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

          {isAuthenticated && (
            <S.LogoutButton onPress={handleLogoutConfirm} chromeless>
              {t('auth.logout')}
              <LogOut color='$red10' size='$1' />
            </S.LogoutButton>
          )}
        </S.ItemContainer>

        <S.CopyrightContainer>
          <BaseText color='$gray10'>
            © 2025 Moodlog. All rights reserved.
          </BaseText>
        </S.CopyrightContainer>
      </S.ViewContainer>
    </ScrollView>
  )
}
