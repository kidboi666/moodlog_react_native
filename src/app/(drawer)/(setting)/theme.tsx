import { Container } from '@/components/containers/Container';
import { useTranslation } from 'react-i18next';
import { Label, RadioGroup, Separator, XStack } from 'tamagui';
import { useAppTheme } from '@/store/hooks/useAppTheme';
import { Theme } from 'src/types/enums';

export default function ThemeScreen() {
  const { currentTheme, changeTheme } = useAppTheme();

  const handleChange = (value: string) => {
    changeTheme(value as Theme);
  };

  return (
    <Container>
      <RadioGroup
        value={currentTheme}
        onValueChange={handleChange}
        name="theme"
      >
        <RadioGroupItem value="system" />
        <Separator />
        <RadioGroupItem value="dark" />
        <Separator />
        <RadioGroupItem value="light" />
      </RadioGroup>
    </Container>
  );
}

function RadioGroupItem({ value }) {
  const { t } = useTranslation();

  return (
    <XStack items="center" width="100%" gap="$4" p="$4">
      <Label fontSize="$6" htmlFor={value} flex={1}>
        {t(`setting.theme.${value}`)}
      </Label>
      <RadioGroup.Item value={value} id={value}>
        <RadioGroup.Indicator />
      </RadioGroup.Item>
    </XStack>
  );
}
