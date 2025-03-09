import { Container } from '@/components/layouts/containers/Container';
import { ScrollView, Separator, YStack } from 'tamagui';
import { Globe, Moon } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { FadeIn } from '@/components/FadeIn';

import { CARD_DELAY } from '@/constants/time';
import { NavigationSettingItem } from '@/components/NavigationSettingItem';

export default function SettingsScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <Container edges={['top']} padded>
        <YStack>
          {/* Theme Setting */}
          <FadeIn delay={CARD_DELAY.FIRST}>
            <NavigationSettingItem
              icon={Moon}
              label={t('settings.theme.title')}
              href="/settings/theme"
            />
            <Separator />
          </FadeIn>

          <FadeIn delay={CARD_DELAY.SECOND}>
            {/* Language Setting */}
            <NavigationSettingItem
              icon={Globe}
              label={t('settings.language.title')}
              href="/settings/language"
            />
          </FadeIn>
        </YStack>
      </Container>
    </ScrollView>
  );
}
