import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { XStackProps } from 'tamagui';
import * as S from './HeaderContainer.styled';

interface Props extends XStackProps {
  edges?: Array<'top' | 'bottom'>;
}

export const HeaderContainer = S.HeaderContainer.styleable<Props>(
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
