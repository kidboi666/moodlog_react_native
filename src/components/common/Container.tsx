import { styled, View, YStackProps } from 'tamagui';
import { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SafeAreaViewContainer = styled(SafeAreaView, {
  bg: '$background',
  height: '100%',
  p: '$4',
  flex: 1,
});

interface Props extends YStackProps {}

export const Container = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <SafeAreaViewContainer>
      <View flex={1} {...props}>
        {children}
      </View>
    </SafeAreaViewContainer>
  );
};

Container.displayName = 'Container';
