import { Container } from '@/components/Container';
import { YStack } from 'tamagui';
import { useThemeContext } from '@/store/hooks/useThemeContext';

export default function Settings() {
  const { currentTheme, toggleTheme } = useThemeContext();

  return (
    <Container>
      <YStack flex={1}></YStack>
    </Container>
  );
}
