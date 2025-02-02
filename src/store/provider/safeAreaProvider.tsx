import { useTheme } from '@/store/context/useTheme';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SafeAreaProvider = ({ children }: PropsWithChildren) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={[
        { backgroundColor: colors.background.primary },
        styles.container,
      ]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
