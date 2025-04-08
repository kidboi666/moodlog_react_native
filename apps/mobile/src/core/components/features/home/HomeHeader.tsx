import { memo } from 'react';

import * as S from 'src/core/components/features/home/HomeHeader.styled';

import { HeaderContainer } from '@/core/components/shared/HeaderContainer.styleable';

export const HomeHeader = memo(() => {
  return (
    <HeaderContainer>
      <S.RestBox />
    </HeaderContainer>
  );
});
