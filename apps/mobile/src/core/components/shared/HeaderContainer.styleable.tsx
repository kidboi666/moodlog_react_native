import { memo } from 'react';

import { XStackProps } from 'tamagui';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as S from './HeaderContainer.styled';

interface Props extends XStackProps {
  edges?: Array<'top' | 'bottom'>;
}

const StyledHeaderContainer = S.HeaderContainer.styleable<Props>(
  ({ children, edges = ['top'], ...props }, ref) => {
    const insets = useSafeAreaInsets();

    return (
      <S.HeaderContainer
        ref={ref}
        topEdge={edges?.includes('top') ? insets.top : 0}
        bottomEdge={edges?.includes('bottom') ? insets.bottom : 0}
        {...props}
      >
        {children}
      </S.HeaderContainer>
    );
  },
);

export const HeaderContainer = memo(StyledHeaderContainer);

HeaderContainer.displayName = 'HeaderContainer';
