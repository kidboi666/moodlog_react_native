import { Container } from '@/components/layouts/containers/Container';
import { RadioGroup, Separator } from 'tamagui';
import { useApp } from '@/store/hooks/useApp';
import { RadioGroupItem } from '@/components/RadioGroupItem';
import { useCallback } from 'react';

export default function LanguageScreen() {
  const { language, onChangeLanguage } = useApp();

  const handleValueChange = useCallback(language => {
    onChangeLanguage(language);
  }, []);

  return (
    <Container>
      <RadioGroup
        value={language}
        onValueChange={handleValueChange}
        name="theme"
      >
        <RadioGroupItem
          value="en"
          label="English"
          onValueChange={handleValueChange}
        />
        <Separator />
        <RadioGroupItem
          value="ko"
          label="한국어"
          onValueChange={handleValueChange}
        />
      </RadioGroup>
    </Container>
  );
}
