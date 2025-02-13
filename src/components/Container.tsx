import { useTheme, View, YStackProps } from 'tamagui';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { CONTAINER_SPACING } from '@/constants/size';
import { LinearGradient } from '@tamagui/linear-gradient';

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

export const ContainerWithLinearGradient = ({ children, edges, ...props }) => {
  const theme = useTheme();

  return (
    <LinearGradient flex={1} {...props} animation="medium">
      <SafeAreaView
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          paddingHorizontal: CONTAINER_SPACING,
        }}
        edges={[...edges]}
      >
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

Container.displayName = 'Container';
ContainerWithSafeAreaView.displayName = 'ContainerWithSafeAreaView';
