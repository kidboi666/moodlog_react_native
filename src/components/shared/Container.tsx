import { useTheme, View, YStackProps } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NewWriteButton } from '@/components/write/NewWriteButton';

export const Container = ({ children, ...props }: YStackProps) => {
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

export const ContainerWithNewWriteButton = ({
  children,
  ...props
}: YStackProps) => {
  return (
    <Container {...props}>
      {children}
      <NewWriteButton />
    </Container>
  );
};

Container.displayName = 'Container';
ContainerWithNewWriteButton.displayName = 'ContainerWithNewWriteButton';
