import { H1, H3, Text, XStack, YStack } from 'tamagui';
import { RECORD_UNIT_LINE_HEIGHT } from '@/constants/size';
import { useTranslation } from 'react-i18next';
import { useStatistics } from '@/store/hooks/useStatistics';
import { getExpressiveMonthString } from '@/utils/common/date';

export const StatsContainer = () => {
  const { t } = useTranslation();
  const { journalStats, emotionStats } = useStatistics();
  const expressiveMonth = getExpressiveMonthString(
    journalStats.expressiveMonth.month,
  );
  const { signatureEmotion, scoreBoard } = emotionStats;
  console.log(JSON.stringify(emotionStats, null, 2));

  return (
    <YStack gap="$4">
      <XStack gap="$4">
        <YStack
          justify="space-between"
          bg="$gray5"
          p="$4"
          rounded="$8"
          flex={1}
          gap="$4"
        >
          <YStack gap="$2">
            <H3 fontWeight="800">{t('record.stats.totalCount.title')}</H3>
            <Text>{t('record.stats.totalCount.description')}</Text>
          </YStack>
          <XStack items="flex-end" gap="$2">
            <H1>{journalStats.totalCount}</H1>
            <Text lineHeight={RECORD_UNIT_LINE_HEIGHT} color="$gray11">
              {t('record.stats.totalCount.unit')}
            </Text>
          </XStack>
        </YStack>
        <YStack
          justify="space-between"
          bg="$gray5"
          p="$4"
          rounded="$8"
          flex={1}
        >
          <YStack gap="$2">
            <H3>{t('record.stats.emotion.title')}</H3>
            <Text>{t('record.stats.emotion.description')}</Text>
          </YStack>
          <H1>행복</H1>
        </YStack>
      </XStack>

      <YStack
        justify="space-between"
        bg="$gray5"
        p="$4"
        rounded="$8"
        gap="$4"
        flex={1}
      >
        <YStack gap="$2">
          <H3>{t('record.stats.bestMonth.title')}</H3>
          <Text>{t('record.stats.bestMonth.description')}</Text>
        </YStack>
        <XStack>
          <H1>{t(`calendar.months.${expressiveMonth}`)}</H1>
        </XStack>
      </YStack>
    </YStack>
  );
};
