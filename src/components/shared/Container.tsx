import { useTheme, View, YStackProps } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = ({ children, ...props }: YStackProps) => {
  return (
    <View flex={1} {...props} animation="medium" bg="$background" px="$4">
      {children}
    </View>
  );
};

export const ContainerWithSafeAreaView = ({
  children,
  ...props
}: YStackProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background.val,
        flex: 1,
        paddingHorizontal: 16,
      }}
      edges={['top']}
    >
      <View flex={1} {...props} bg="transparent">
        {children}
      </View>
    </SafeAreaView>
  );
};

Container.displayName = 'Container';
