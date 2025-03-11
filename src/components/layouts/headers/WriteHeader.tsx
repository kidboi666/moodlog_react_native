import React from 'react';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { useNavigation } from 'expo-router';
import * as S from './WriteHeader.styled';

export const WriteHeader = () => {
  const navigation = useNavigation();
  return (
    <S.HeaderContainer>
      <S.BackButton icon={ArrowLeft} onPress={() => navigation.goBack()} />
    </S.HeaderContainer>
  );
};
