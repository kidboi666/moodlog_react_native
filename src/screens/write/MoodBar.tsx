import { emotionTheme } from '@/constants/themes';
import React from 'react';
import { Emotion } from '@/types/entries';
import * as S from './MoodBar.styled';

interface Props {
  emotion?: Emotion;
}

export const MoodBar = ({ emotion }: Props) => {
  return (
    <S.MoodBar
      moodColor={
        emotion ? emotionTheme[emotion?.type][emotion?.level] : '$gray8'
      }
    />
  );
};
