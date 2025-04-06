import { NavigationSettingItem } from '@/core/components/features/settings/NavigationSettingItem';
import { useDev } from '@/core/hooks/useDev';
import * as S from '@/styles/screens/settings/Settings.styled';
import { Clock, Computer, Globe, Moon } from '@tamagui/lucide-icons';
import { Href, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, H1, ScrollView } from 'tamagui';

export default function Screen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { onClearStorage } = useDev();

  const handleRouteChange = useCallback(
    (route: Href) => {
      router.push(route);
    },
    [router],
  );

  return (
    <ScrollView>
      <S.ViewContainer edges={['top']} padded>
        <H1>{t('settings.title')}</H1>
        <S.ItemContainer>
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
          {__DEV__ && (
            <Button
              icon={Computer}
              themeInverse
              onPress={() => onClearStorage()}
            >
              dev
            </Button>
          )}
        </S.ItemContainer>
      </S.ViewContainer>
    </ScrollView>
  );
}
