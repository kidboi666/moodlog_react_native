import { Button, ButtonProps } from 'tamagui';
import { useThemeContext } from '@/store/useThemeContext';
import { Moon, Sun } from '@tamagui/lucide-icons';

export const ThemeToggle = ({ ...props }: ButtonProps) => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Button
      unstyled
      size="$4"
      justify="center"
      icon={theme === 'dark' ? <Sun /> : <Moon />}
      onPress={() => toggleTheme()}
      {...props}
    />
  );
};
