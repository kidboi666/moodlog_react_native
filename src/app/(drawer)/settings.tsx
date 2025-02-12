import { Container } from '@/components/shared/Container';
import { Label, Switch, XStack, YStack } from 'tamagui';
import { useThemeContext } from '@/store/hooks/useThemeContext';

export default function Settings() {
  const { currentTheme, toggleTheme } = useThemeContext();

  return (
    <Container>
      <YStack flex={1}>
        <XStack justify="space-between">
          <Label>Dark Mode</Label>
          <Switch
            checked={currentTheme === 'dark'}
            onCheckedChange={toggleTheme}
            bg={currentTheme === 'dark' ? '$green10' : '$background'}
            borderColor={currentTheme === 'dark' ? '$green10' : '$background'}
          >
            <Switch.Thumb
              animation="bouncy"
              bg={currentTheme === 'dark' ? '$gray4' : '$gray9'}
            />
          </Switch>
        </XStack>
      </YStack>
    </Container>
  );
}
