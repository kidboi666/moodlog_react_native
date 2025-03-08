import { TextProps } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { WEEK_DAY } from '@/constants/date';
import * as S from './RenderDate.styled';

interface Props extends TextProps {
  createdAt: string;
}

export const RenderDay = ({ createdAt, ...props }: Props) => {
  const { t } = useTranslation();
  const day = new Date(createdAt);

  return (
    <S.Text {...props}>
      {t(`calendar.days.${Object.keys(WEEK_DAY)[day.getDay()]}`)}
      {t(`common.units.day`)}
    </S.Text>
  );
};
