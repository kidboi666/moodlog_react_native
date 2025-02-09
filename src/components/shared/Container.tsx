import { useTheme, View, YStackProps } from 'tamagui';
import { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props extends YStackProps {}

export const Container = ({ children, ...props }: PropsWithChildren<Props>) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background.val,
        flex: 1,
        paddingHorizontal: 16,
      }}
      edges={['bottom']}
    >
      <View flex={1} {...props} bg="transparent">
        {children}
      </View>
    </SafeAreaView>
  );
};

Container.displayName = 'Container';
