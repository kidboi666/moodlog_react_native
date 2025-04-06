import React from 'react';
import * as S from 'src/core/components/features/calendar/ArrowButton.styled';

interface Props {
  icon: any;
}

export const ArrowButton = ({ icon }: Props) => {
  return <S.StyledArrowButton icon={icon} />;
};
