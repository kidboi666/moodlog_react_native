import { ViewProps } from 'tamagui';
import React from 'react';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import { HeaderContainer } from '@/components/layouts/containers/HeaderContainer';
import * as S from './WriteHeader.styled';

export const WriteHeader = ({ ...props }: ViewProps) => {
  return (
    <HeaderContainer {...props}>
      <S.BackButton icon={ArrowLeft} onPress={() => router.back()} />
    </HeaderContainer>
  );
};
