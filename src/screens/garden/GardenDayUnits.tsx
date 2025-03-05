import { H6, View, YStack } from 'tamagui';
import { WEEK_DAY } from '@/constants/date';
import { useTranslation } from 'react-i18next';

export const GardenDayUnits = () => {
  const { t } = useTranslation();
  return (
    <YStack py="$4">
      <View width="$2" height="$2" />
      <YStack flex={1} height="100%" justify="space-between">
        {Object.keys(WEEK_DAY).map(day => (
          <H6 key={day} fontSize="$3" color="$gray11">
            {t(`calendar.daysShort.${day}`)}
          </H6>
        ))}
      </YStack>
    </YStack>
  );
};
