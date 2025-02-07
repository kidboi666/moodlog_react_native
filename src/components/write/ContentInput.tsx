import React, { useRef } from 'react';
import * as S from './ContentInput.styled';

export const ContentInput = ({ ...props }) => {
  // @TODO any type
  const ref = useRef<any>(null);

  const handleFocusInput = () => {
    ref.current?.focus();
  };

  return (
    <S.Container>
      <S.ContentInput
        multiline
        unstyled
        ref={ref}
        placeholder="오늘 당신의 감정을 기록하세요."
        {...props}
      />
      <S.ViewBox>
        <S.InputFocusTrigger unstyled onPress={handleFocusInput} />
      </S.ViewBox>
    </S.Container>
  );
};
