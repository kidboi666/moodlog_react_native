import { useTranslation } from 'react-i18next';
import * as S from './GardenTitleHeader.styled';

export const GardenTitleHeader = () => {
  const { t } = useTranslation();
  return (
    <S.GardenTitleHeaderContainer>
      <S.GardenTitle>{t('records.garden.title')}</S.GardenTitle>
      <S.GardenDescription>
        {t('records.garden.description')}
      </S.GardenDescription>
    </S.GardenTitleHeaderContainer>
  );
};
