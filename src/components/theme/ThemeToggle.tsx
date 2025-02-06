import { Button } from '../common/Button';

export const ThemeToggle = ({ toggleTheme }: { toggleTheme: () => void }) => {
  return <Button onPress={toggleTheme}>테마 변경 하기</Button>;
};
