import { Container } from '@/components/containers/Container';
import {
  H2,
  H3,
  H6,
  Paragraph,
  ScrollView,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { MONTHS, WEEK_DAY } from '@/constants/date';
import {
  getFirstDateDay,
  getLastDate,
  getMonthNumber,
  getWeekLength,
} from '@/utils/common/date';
import { useTranslation } from 'react-i18next';
import { useJournal } from '@/store/hooks/useJournal';

// 월별 데이터 미리 계산하는 함수

export default function RecordScreen() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const { getDateCountsForDate } = useJournal();
  const getMonthsData = year =>
    Object.keys(MONTHS).map(month => ({
      monthString: month,
      lastDate: getLastDate(year, month),
      firstDateDay: getFirstDateDay(year, month),
      weekLength: getWeekLength(year, month),
    }));

  const monthsData = getMonthsData(currentYear);

  return (
    <Container>
      <YStack bg="$gray5" p="$4" rounded="$8" gap="$4">
        <YStack gap="$2">
          <H2 fontWeight="800">{t('record.garden.title')}</H2>
          <Paragraph>{t('record.garden.description')}</Paragraph>
          <H3 fontWeight="800">{currentYear}</H3>
        </YStack>
        <ScrollView horizontal>
          <YStack>
            <View width="$2" height="$2" />
            <YStack flex={1} height="100%" justify="space-between">
              {Object.keys(WEEK_DAY).map(day => (
                <H6 key={day} fontSize="$3">
                  {t(`calendar.days.${day}`)}
                </H6>
              ))}
            </YStack>
          </YStack>
          <XStack gap="$2">
            {monthsData.map(
              ({ monthString, lastDate, firstDateDay, weekLength }) => {
                return (
                  <YStack key={monthString}>
                    <View height="$2">
                      <H6 fontSize="$4" fontWeight="600">
                        {t(`calendar.months.${monthString}`)}
                      </H6>
                    </View>
                    <XStack gap="$2">
                      {Array.from({ length: weekLength }, (_, week) => (
                        <YStack key={`${monthString}-week-${week}`} gap="$2">
                          {Array.from({ length: 7 }, (_, day) => {
                            const dateNum = week * 7 + day - firstDateDay + 1;
                            const journalsCount = getDateCountsForDate(
                              currentYear,
                              getMonthNumber(monthString),
                              dateNum,
                            );
                            if (dateNum <= 0 || dateNum > lastDate) {
                              return (
                                <View
                                  key={`${monthString}-${week}-${day}`}
                                  width={16}
                                  height={16}
                                />
                              );
                            }

                            return (
                              <View
                                key={`${monthString}-${week}-${day}`}
                                bg={journalsCount ? '$green11' : '$gray8'}
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
    </Container>
  );
}
