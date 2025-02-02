import { Container } from '@/components/common/Container';
import { ThemedButton } from '@/components/common/ThemedButton';
import { ThemedText } from '@/components/common/ThemedText';
import { ToggleThemeButton } from '@/components/theme/ToggleThemeButton';
import { RootStackParamList } from '@/types/screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
  return (
    <Container style={styles.container}>
      <ThemedText>홈 화면</ThemedText>
      <ToggleThemeButton />
      <ThemedButton onPress={() => navigation.navigate('Write')}>
        글쓰기 페이지로 이동
      </ThemedButton>
      <ThemedButton onPress={() => navigation.navigate('Profile')}>
        프로필 페이지로 이동
      </ThemedButton>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
});
