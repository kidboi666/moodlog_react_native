import { Href, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, H1, ScrollView, Separator, YStack } from 'tamagui';

import {
  Clock,
  Computer,
  Globe,
  LogOut,
  Moon,
  User,
} from '@tamagui/lucide-icons';

import { NavigationSettingItem } from '@/core/components/features/settings/NavigationSettingItem';
import { useDev } from '@/core/hooks/useDev';
import { useAuth } from '@/core/store/auth.store';

import * as S from '@/styles/screens/settings/Settings.styled';

export default function Screen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { onClearStorage } = useDev();
  const logout = useAuth(state => state.logout);

  const handleRouteChange = useCallback(
    (route: Href) => {
      router.push(route);
    },
    [router],
  );

  const handleLogout = useCallback(() => {
    logout();
    router.replace('/login');
  }, [logout, router]);

  return (
    <ScrollView>
      <S.ViewContainer edges={['top']} padded>
        <H1>{t('settings.title')}</H1>
        <S.ItemContainer>
          {/* Profile Setting */}
          <NavigationSettingItem
            icon={User}
            label={t('settings.profile.title') || 'Profile'}
            href={'/settings/profile' as any}
            onRouteChange={handleRouteChange}
          />
          {/* Theme Setting */}
          <NavigationSettingItem
            icon={Moon}
            label={t('settings.theme.title')}
            href="/settings/theme"
            onRouteChange={handleRouteChange}
          />
          {/* Language Setting */}
          <NavigationSettingItem
            icon={Globe}
            label={t('settings.language.title')}
            onRouteChange={handleRouteChange}
            href="/settings/language"
          />
          {/* TimeFormat Setting */}
          <NavigationSettingItem
            icon={Clock}
            label={t('settings.timeFormat.title')}
            onRouteChange={handleRouteChange}
            href="/settings/time_format"
          />

          <YStack space="$4">
            <Separator />

            {/* Logout Button */}
            <Button icon={LogOut} onPress={handleLogout} color="$red10">
              {t('auth.logout')}
            </Button>

            {__DEV__ && (
              <Button
                icon={Computer}
                themeInverse
                onPress={() => onClearStorage()}
              >
                dev
              </Button>
            )}
          </YStack>
        </S.ItemContainer>
      </S.ViewContainer>
    </ScrollView>
  );
}
