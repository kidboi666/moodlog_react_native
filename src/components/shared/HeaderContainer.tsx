import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'tamagui';
import { PropsWithChildren } from 'react';

export const HeaderContainer = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background.val,
        width: '100%',
        padding: 18,
      }}
      edges={['top']}
    >
      {children}
    </SafeAreaView>
  );
};
