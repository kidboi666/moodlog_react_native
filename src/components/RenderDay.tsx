import { Text, TextProps } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { WEEK_DAY } from '@/constants/date';

interface Props extends TextProps {
  createdAt: string;
}

export const RenderDay = ({ createdAt, ...props }: Props) => {
  const { t } = useTranslation();
  const day = new Date(createdAt);

  return (
    <Text {...props}>
      {t(`calendar.days.${Object.keys(WEEK_DAY)[day.getDay()]}`)}
      {t(`common.units.day`)}
    </Text>
  );
};
