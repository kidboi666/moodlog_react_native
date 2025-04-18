import { useTranslation } from 'react-i18next'
import * as S from './EmptyContent.styled'

export const EmptyContent = () => {
  const { t } = useTranslation()

  return (
    <S.ViewContainer>
      <S.YStackContainer>
        <S.Title>{t('statistics.empty.title')}</S.Title>
        <S.Description>{t('statistics.empty.description')}</S.Description>
      </S.YStackContainer>
    </S.ViewContainer>
  )
}
