import { Button, ButtonProps } from 'tamagui';
import { useThemeContext } from '@/store/hooks/useThemeContext';
import { Moon, Sun } from '@tamagui/lucide-icons';

export const ThemeToggle = ({ ...props }: ButtonProps) => {
  const { currentTheme, toggleTheme } = useThemeContext();

  return (
    <Button
      size="$2"
      justify="center"
      icon={currentTheme === 'dark' ? <Sun /> : <Moon />}
      onPress={() => toggleTheme()}
      {...props}
    />
  );
};
