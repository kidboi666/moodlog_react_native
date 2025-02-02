import { ThemedButton } from '@/components/common/ThemedButton';
import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import { ThemedText } from '@/components/common/ThemedText';
import { ToggleThemeButton } from '@/components/theme/ToggleThemeButton';
import { RootStackParamList } from '@/types/screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText>홈 화면</ThemedText>
      <ToggleThemeButton />
      <ThemedButton onPress={() => navigation.navigate('Write')}>
        상세 페이지로 이동
      </ThemedButton>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
