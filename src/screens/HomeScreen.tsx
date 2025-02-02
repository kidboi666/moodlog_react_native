import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
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
      <Button onPress={() => navigation.navigate('Write')}>
        글쓰기 페이지로 이동
      </Button>
      <Button onPress={() => navigation.navigate('Profile')}>
        프로필 페이지로 이동
      </Button>
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
