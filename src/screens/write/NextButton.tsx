import React from 'react';
import { Emotion } from '@/types/entries';
import { router } from 'expo-router';
import { ArrowRight } from '@tamagui/lucide-icons';
import * as S from './NextButton.styled';

interface Props {
  emotion?: Emotion;
}

export const NextButton = ({ emotion }: Props) => {
  return (
    <S.ViewContainer>
      <S.NextButton
        disabled={!emotion}
        onPress={() => router.push('/write/journal_write')}
        icon={ArrowRight}
      />
    </S.ViewContainer>
  );
};
