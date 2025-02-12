import { useTheme, View, YStackProps } from 'tamagui';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { CONTAINER_SPACING } from '@/constants/size';

export const Container = ({ children, ...props }: YStackProps) => {
  return (
    <View
      flex={1}
      {...props}
      animation="medium"
      bg="$background"
      px={CONTAINER_SPACING}
    >
      {children}
    </View>
  );
};

interface Props extends YStackProps {
  edges: Edge[];
}

export const ContainerWithSafeAreaView = ({
  children,
  edges,
  ...props
}: Props) => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background.val,
        flex: 1,
        paddingHorizontal: CONTAINER_SPACING,
      }}
      edges={[...edges]}
    >
      <View flex={1} {...props} animation="medium" bg="transparent">
        {children}
      </View>
    </SafeAreaView>
  );
};

Container.displayName = 'Container';
