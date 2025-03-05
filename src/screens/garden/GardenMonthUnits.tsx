import { H6, View } from 'tamagui';
import { useTranslation } from 'react-i18next';

interface Props {
  month: string;
  isSelected: boolean;
}

export const GardenMonthUnits = ({ month, isSelected }: Props) => {
  const { t } = useTranslation();
  return (
    <View height="$2">
      <H6
        fontSize="$4"
        fontWeight="600"
        color={isSelected ? '$gray12' : '$gray10'}
      >
        {t(`calendar.months.${month}`)}
      </H6>
    </View>
  );
};
