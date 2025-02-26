import { Container } from '@/components/containers/Container';
import { ScrollView, Separator, YStack } from 'tamagui';
import { Globe, Moon } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { SettingItem } from '@/components/SettingItem';

export default function SettingMainScreen() {
  const { t } = useTranslation();

  return (
    <Container>
      <ScrollView>
        <YStack>
          {/* Theme Setting */}
          <SettingItem
            icon={<Moon size="$1" />}
            label={t('settings.theme.title')}
            href="/theme"
          />

          <Separator />

          {/* Language Setting */}
          <SettingItem
            icon={<Globe size="$1" />}
            label={t('settings.language.title')}
            href="/language"
          />
        </YStack>
      </ScrollView>
    </Container>
  );
}
