import { useTranslation } from 'react-i18next';
import { H2, H3, H5, Text, XStack, YStack } from 'tamagui';
import { Minimize2 } from '@tamagui/lucide-icons';
import { SelectedMonthStats } from '@/types/entries';
import { getEmotionTheme, getMonthStringWithoutYear } from '@/utils/common';
import { EmotionLevel, EmotionType } from '@/types/enums';

interface Props {
  selectedMonthStats: SelectedMonthStats;
}

export const ExpandedContent = ({ selectedMonthStats }: Props) => {
  const { t } = useTranslation();
  const {
    month: ISOMonthString,
    count,
    activeDay,
    frequency,
    signatureEmotion,
  } = selectedMonthStats;

  const month = t(
    `calendar.months.${getMonthStringWithoutYear(ISOMonthString)}`,
  );

  return (
    <YStack
      animation="quick"
      animateOnly={['opacity']}
      flex={1}
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
    >
      <XStack
        justify="space-between"
        items="center"
        rounded="$8"
        p="$4"
        bg={getEmotionTheme(
          signatureEmotion.type as EmotionType,
          EmotionLevel.FULL,
        )}
      >
        <H3 fontWeight="800" color="$gray1">
          {t('records.stats.currentMonth.emotion', { month })}
        </H3>
        <H2 color="$gray1">
          {signatureEmotion
            ? t(`emotions.types.${signatureEmotion.type}`)
            : t('common.fallback.text')}
        </H2>
      </XStack>
      <YStack flex={1} justify="space-between" p="$4">
        <YStack gap="$2">
          <H5 fontWeight="800">
            {t('records.stats.currentMonth.journalCount.title', {
              month,
            })}
          </H5>
          <Text color="$gray11">
            {t(`records.stats.currentMonth.journalCount.description`, {
              count,
            })}
          </Text>
        </YStack>
        <YStack gap="$2">
          <H5 fontWeight="800">
            {t('records.stats.currentMonth.frequency.title', { month })}
          </H5>
          <Text color="$gray11">
            {frequency === 0
              ? t('records.stats.currentMonth.frequency.everyDay', { month })
              : t('records.stats.currentMonth.frequency.description', {
                  date: frequency,
                  month,
                })}
          </Text>
        </YStack>
        <YStack gap="$2">
          <H5 fontWeight="800">
            {t('records.stats.currentMonth.mostDay.title', { month })}
          </H5>
          <Text color="$gray11">
            {t('records.stats.currentMonth.mostDay.description', {
              day: t(`calendar.days.${activeDay}`),
              month,
            })}
          </Text>
        </YStack>
        <Minimize2 size="$1" self="flex-end" opacity={0.6} />
      </YStack>
    </YStack>
  );
};
