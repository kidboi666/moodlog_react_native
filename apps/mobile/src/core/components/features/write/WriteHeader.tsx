import React from 'react';

import { useRouter } from 'expo-router';

import * as S from 'src/core/components/features/write/WriteHeader.styled';
import { ArrowLeft } from '@tamagui/lucide-icons';

export const WriteHeader = () => {
  const router = useRouter();
  return (
    <S.HeaderContainer edges={['top', 'bottom']}>
      <S.BackButton icon={ArrowLeft} onPress={() => router.back()} />
    </S.HeaderContainer>
  );
};
