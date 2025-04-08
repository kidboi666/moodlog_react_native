import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { RadioGroup } from 'tamagui';

import { SettingHeader } from '@/core/components/features/settings/SettingHeader';
import { RadioGroupItem } from '@/core/components/shared/RadioGroupItem';
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable';
import { useAppTheme } from '@/core/store/contexts/theme.context';

import { Theme } from '@/types/app.types';

export default function Screen() {
  const { currentTheme, changeTheme } = useAppTheme();
  const { t } = useTranslation();

  const handleValueChange = useCallback(
    (value: string) => {
      changeTheme(value as Theme);
    },
    [changeTheme],
  );

  return (
    <ViewContainer Header={<SettingHeader />}>
      <RadioGroup
        value={currentTheme}
        onValueChange={handleValueChange}
        name="theme"
        gap="$4"
      >
        <RadioGroupItem
          value="system"
          label={t(`settings.theme.system`)}
          onValueChange={handleValueChange}
        />
        <RadioGroupItem
          value="dark"
          label={t(`settings.theme.dark`)}
          onValueChange={handleValueChange}
        />
        <RadioGroupItem
          value="light"
          label={t(`settings.theme.light`)}
          onValueChange={handleValueChange}
        />
      </RadioGroup>
    </ViewContainer>
  );
}
