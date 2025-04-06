import { HeaderContainer } from '@/core/components/shared/HeaderContainer.styleable';
import { memo } from 'react';
import * as S from 'src/core/components/features/home/HomeHeader.styled';

export const HomeHeader = memo(() => {
  return (
    <HeaderContainer>
      <S.RestBox />
    </HeaderContainer>
  );
});
