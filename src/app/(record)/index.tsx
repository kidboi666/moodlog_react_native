import { Container } from '@/components/containers/Container';
import { H2, H6, Paragraph, ScrollView, View, XStack, YStack } from 'tamagui';
import { MONTHS } from '@/constants/date';
import {
  getFirstDateDay,
  getLastDate,
  getWeekLength,
} from '@/utils/common/date';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

// 월별 데이터 미리 계산하는 함수
const useMonthsData = year => {
  return useMemo(() => {
    return Object.keys(MONTHS).map(month => ({
      month,
      lastDate: getLastDate(year, month),
      firstDateDay: getFirstDateDay(year, month),
      weekLength: getWeekLength(year, month),
    }));
  }, [year]);
};

export default function RecordScreen() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const monthsData = useMonthsData(currentYear);

  return (
    <Container>
      <YStack bg="$gray5" p="$4" rounded="$8" gap="$4">
        <YStack gap="$2">
          <H2 fontWeight="800" color="$gray11">
            {t('record.garden.title')}
          </H2>
          <Paragraph>{t('record.garden.description')}</Paragraph>
        </YStack>
        <YStack>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack gap="$4">
              {monthsData.map(
                ({ month, lastDate, firstDateDay, weekLength }) => {
                  return (
                    <YStack key={month} gap="$4">
                      <H6 fontSize="$4" fontWeight="600" color="$gray10">
                        {t(`calendar.months.${month}`)}
                      </H6>
                      <XStack gap="$2">
                        {Array.from({ length: weekLength }, (_, week) => (
                          <YStack key={`${month}-week-${week}`} gap="$2">
                            {Array.from({ length: 7 }, (_, day) => {
                              const dateNum = week * 7 + day - firstDateDay + 1;
                              if (dateNum <= 0 || dateNum > lastDate) {
                                return (
                                  <View
                                    key={`${month}-${week}-${day}`}
                                    width={16}
                                    height={16}
                                  />
                                );
                              }

                              return (
                                <View
                                  key={`${month}-${week}-${day}`}
                                  bg="$gray8"
                                  width={16}
                                  height={16}
                                  rounded="$1"
                                />
                              );
                            })}
                          </YStack>
                        ))}
                      </XStack>
                    </YStack>
                  );
                },
              )}
            </XStack>
          </ScrollView>
        </YStack>
      </YStack>
    </Container>
  );
}
