import { Container } from '@/components/layouts/containers/Container';
import { ScrollView, Separator, YStack } from 'tamagui';
import { Globe, Moon } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { SettingItem } from '@/components/SettingItem';
import { SettingHeader } from '@/components/layouts/headers/SettingHeader';

export default function SettingsScreen() {
  const { t } = useTranslation();

  return (
    <Container>
      <ScrollView flex={1}>
        <SettingHeader />
        <YStack>
          {/* Theme Setting */}
          <SettingItem
            icon={<Moon size="$1" />}
            label={t('settings.theme.title')}
            href="/settings/theme"
          />

          <Separator />

          {/* Language Setting */}
          <SettingItem
            icon={<Globe size="$1" />}
            label={t('settings.language.title')}
            href="/settings/language"
          />
        </YStack>
      </ScrollView>
    </Container>
  );
}
