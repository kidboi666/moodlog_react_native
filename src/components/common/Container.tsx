import { ViewProps } from 'tamagui';
import { PropsWithChildren } from 'react';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import * as S from './Container.styled';

type Props = Omit<ViewProps, keyof SafeAreaViewProps>;

export const Container = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <S.View {...props}>
      <S.GradientContainer>{children}</S.GradientContainer>
    </S.View>
  );
};

Container.displayName = 'Container';
