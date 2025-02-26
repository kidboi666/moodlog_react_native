import { H2, Paragraph, YStack } from 'tamagui';
import { useTranslation } from 'react-i18next';

export const GardenTitleHeader = () => {
  const { t } = useTranslation();
  return (
    <YStack gap="$2">
      <H2 fontWeight="800" color="$gray12">
        {t('records.garden.title')}
      </H2>
      <Paragraph color="$gray12">{t('records.garden.description')}</Paragraph>
    </YStack>
  );
};
