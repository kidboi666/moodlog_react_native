import { useFadeIn } from '@/hooks/useFadeIn';
import { ViewProps } from 'tamagui';
import * as S from './FadeIn.styled';
import { memo } from 'react';

interface Props extends ViewProps {
  delay?: number;
}

export const FadeIn = memo(({ delay = 1000, children, ...props }: Props) => {
  const { isVisible, item } = useFadeIn({ delay, item: children });

  return (
    <S.FadeInContainer isVisible={isVisible} {...props}>
      {item}
    </S.FadeInContainer>
  );
});
