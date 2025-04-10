import { Computer, LogOut } from '@tamagui/lucide-icons'
import { type Href, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, H1, ScrollView } from 'tamagui'

import { NavigationSettingItem } from '@/core/components/features/settings/NavigationSettingItem'
import { SettingsContainer } from '@/core/components/features/settings/SettingsContainer'
import { useDev } from '@/core/hooks/useDev'
import { useAuth } from '@/core/store/auth.store'
import * as S from '@/styles/screens/settings/Settings.styled'

export default function Screen() {
  const { t } = useTranslation()
  const router = useRouter()
  const { resetStores } = useDev()
  const logout = useAuth(state => state.logout)

  const handleRouteChange = useCallback(
    (route: Href) => {
      router.push(route)
    },
    [router],
  )

  const handleLogout = useCallback(() => {
    logout()
    router.replace('/(tabs)')
  }, [logout, router])

  return (
    <ScrollView>
      <S.ViewContainer edges={['top']} padded>
        <H1>{t('settings.title')}</H1>
        <S.ItemContainer>
          {__DEV__ && (
            <Button icon={Computer} themeInverse onPress={resetStores}>
              dev
            </Button>
          )}
          <SettingsContainer title={t('settings.menuTitle.login')}>
            <NavigationSettingItem
              label={t('settings.profile.title') || 'Profile'}
              href={'/settings/profile' as any}
              onRouteChange={handleRouteChange}
            />
          </SettingsContainer>

          <SettingsContainer title={t('settings.menuTitle.config')}>
            <NavigationSettingItem
              label={t('settings.theme.title')}
              href='/settings/theme'
              onRouteChange={handleRouteChange}
            />
            <NavigationSettingItem
              label={t('settings.language.title')}
              onRouteChange={handleRouteChange}
              href='/settings/language'
            />
            <NavigationSettingItem
              label={t('settings.timeFormat.title')}
              onRouteChange={handleRouteChange}
              href='/settings/time_format'
            />
          </SettingsContainer>

          <SettingsContainer title={t('settings.menuTitle.report')}>
            <NavigationSettingItem
              label={t('settings.bugReport.title')}
              onRouteChange={handleRouteChange}
              href='/settings/bug_report'
            />
            <NavigationSettingItem
              label={t('settings.qna.title')}
              onRouteChange={handleRouteChange}
              href='/settings/qna'
            />
          </SettingsContainer>

          <Button onPress={handleLogout} color='$red10' chromeless>
            {t('auth.logout')}
            <LogOut color='$red10' size='$1' />
          </Button>
        </S.ItemContainer>
      </S.ViewContainer>
    </ScrollView>
  )
}
