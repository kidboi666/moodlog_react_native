import { Button, ButtonProps } from 'tamagui';
import { useAppTheme } from '@/store/hooks/useAppTheme';
import { Moon, Sun } from '@tamagui/lucide-icons';

export const ThemeToggle = ({ ...props }: ButtonProps) => {
  const { currentTheme, toggleTheme } = useAppTheme();

  return (
    <Button
      size="$3"
      justify="center"
      icon={currentTheme === 'dark' ? <Sun /> : <Moon />}
      onPress={() => toggleTheme()}
      {...props}
    />
  );
};
