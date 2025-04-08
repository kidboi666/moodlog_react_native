import { memo } from 'react';

import * as S from './ContentLength.styled';

interface Props {
  length: number;
}

export const ContentLength = memo(({ length }: Props) => {
  const isGreen = length > 0 && length < 150;
  const isYellow = length > 150;
  const isRed = length > 300;
  return (
    <S.CharNum isGreen={isGreen} isYellow={isYellow} isRed={isRed}>
      {length} / 300
    </S.CharNum>
  );
});
