import React, { memo } from 'react';
import { Emotion } from '@/types/entries';
import { router } from 'expo-router';
import { ArrowRight } from '@tamagui/lucide-icons';
import * as S from './NextButton.styled';
import { AnimatePresence } from 'tamagui';

interface Props {
  mood?: Emotion;
}

export const NextButton = memo(({ mood }: Props) => {
  return (
    <S.ViewContainer>
      <AnimatePresence>
        {mood && (
          <S.NextButton
            disabled={!mood}
            onPress={() => router.push('/write/journal_write')}
            icon={ArrowRight}
          />
        )}
      </AnimatePresence>
    </S.ViewContainer>
  );
});
