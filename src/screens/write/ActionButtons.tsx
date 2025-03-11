import { Check, ImagePlus, Timer } from '@tamagui/lucide-icons';
import React from 'react';
import { Nullable } from '@/types/utils';
import * as S from './ActionButtons.styled';
import { XGroup } from 'tamagui';

interface Props {
  onImageUriChange: () => Promise<Nullable<void>>;
  onTimeStamp: () => void;
  onSubmit: () => void;
}

export const ActionButtons = ({
  onImageUriChange,
  onTimeStamp,
  onSubmit,
}: Props) => {
  return (
    <S.XGroupContainer>
      <XGroup.Item>
        <S.AddImageButton onPress={onImageUriChange} icon={ImagePlus} />
      </XGroup.Item>
      <S.VerticalSeparator />
      <XGroup.Item>
        <S.TimeStampButton onPress={onTimeStamp} icon={Timer} />
      </XGroup.Item>
      <S.VerticalSeparator />
      <XGroup.Item>
        <S.SubmitButton onPress={onSubmit} icon={Check} />
      </XGroup.Item>
    </S.XGroupContainer>
  );
};
