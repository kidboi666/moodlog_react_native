import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { Text } from '@/components/common/ThemedText';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { RootStackParamList } from '@/types/screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
  return (
    <Container items="center" justify="center" gap={12}>
      <Text>홈 화면</Text>
      <ThemeToggle />
      <Button onPress={() => navigation.navigate('Write')}>
        글쓰기 페이지로 이동
      </Button>
      <Button onPress={() => navigation.navigate('Profile')}>
        프로필 페이지로 이동
      </Button>
    </Container>
  );
};
