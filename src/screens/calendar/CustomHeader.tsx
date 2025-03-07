import { H2 } from 'tamagui';
import { getMonthString } from '@/utils/common';
import { useTranslation } from 'react-i18next';

interface Props {
  date: Date;
}

export const CustomHeader = ({ date }: Props) => {
  const month = getMonthString(new Date(date).getMonth());
  const { t } = useTranslation();

  return <H2>{t(`calendar.months.${month}`)}</H2>;
};
