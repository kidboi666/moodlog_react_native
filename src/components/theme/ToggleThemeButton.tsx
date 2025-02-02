import { Button } from '@/components/common/Button';
import { useTheme } from '@/store/context/useTheme';

export const ToggleThemeButton = () => {
  const { toggleTheme } = useTheme();
  return <Button onPress={() => toggleTheme()}>다크모드 변경</Button>;
};
