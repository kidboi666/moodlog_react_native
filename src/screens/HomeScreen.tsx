import { Container } from '@/components/common/Container';
import { Text } from '@/components/common/Text';
import { MenuButton } from '@/components/navigation/MenuButton';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { RootStackParamList } from '@/types/screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { XStack } from 'tamagui';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
  return (
    <Container items="center" justify="center" gap={12}>
      <Text>홈 화면</Text>
      <XStack height="$10" gap="$4" px="$4">
        <ThemeToggle />
        <MenuButton onPress={() => navigation.navigate('Write')}>
          글쓰기 페이지로 이동
        </MenuButton>
      </XStack>
      <XStack height="$10" gap="$4" px="$4">
        <MenuButton onPress={() => navigation.navigate('Profile')}>
          프로필 페이지로 이동
        </MenuButton>
      </XStack>
    </Container>
  );
};
