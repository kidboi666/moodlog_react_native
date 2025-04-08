import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { RadioGroup } from 'tamagui';

import { SettingHeader } from '@/core/components/features/settings/SettingHeader';
import { RadioGroupItem } from '@/core/components/shared/RadioGroupItem';
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable';
import { useApp } from '@/core/store/contexts/app.context';

import { TimeFormat } from '@/types/app.types';

export default function Screen() {
  const { timeFormat, onSettingChange } = useApp();
  const { t } = useTranslation();

  const handleValueChange = useCallback(
    (timeFormat: string) => {
      onSettingChange('timeFormat', timeFormat as TimeFormat);
    },
    [onSettingChange],
  );

  return (
    <ViewContainer Header={<SettingHeader />}>
      <RadioGroup
        value={timeFormat}
        onValueChange={handleValueChange}
        name="theme"
        gap="$4"
      >
        <RadioGroupItem
          value={TimeFormat.HOUR_12}
          label={t(`settings.timeFormat.12`)}
          onValueChange={handleValueChange}
        />
        <RadioGroupItem
          value={TimeFormat.HOUR_24}
          label={t(`settings.timeFormat.24`)}
          onValueChange={handleValueChange}
        />
      </RadioGroup>
    </ViewContainer>
  );
}
