import { memo } from 'react'

import * as S from '@/components/features/home/HomeHeader.styled'

import { HeaderContainer } from '@/components/shared/HeaderContainer.styleable'

export const HomeHeader = memo(() => {
  return (
    <HeaderContainer>
      <S.RestBox />
    </HeaderContainer>
  )
})
