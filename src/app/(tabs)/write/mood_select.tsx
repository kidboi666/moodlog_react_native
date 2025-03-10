import React from 'react';
import { useDraft } from '@/store/hooks/useDraft';
import { MoodSelectTitle } from '@/screens/write/MoodSelectTitle';
import { SelectedMoodContainer } from '@/screens/write/SelectedMoodContainer';
import { PickerMood } from '@/screens/write/PickerMood';
import { NextButton } from '@/screens/write/NextButton';
import { FadeIn } from '@/components/FadeIn';
import { MoodBar } from '@/screens/write/MoodBar';
import { WriteHeader } from '@/components/layouts/headers/WriteHeader';
import { CARD_DELAY } from '@/constants/time';
import * as S from '@/styles/write/MoodSelect.styled';

export default function MoodScreen() {
  const { draft, onEmotionChange } = useDraft();

  return (
    <S.ViewContainer edges={['bottom']} Header={<WriteHeader />}>
      <S.XStackContainer>
        <S.YStackContainer>
          <FadeIn delay={CARD_DELAY.FIRST}>
            <MoodSelectTitle />
          </FadeIn>

          <FadeIn delay={CARD_DELAY.SECOND} flex={1}>
            <SelectedMoodContainer emotion={draft.emotion ?? null} />
          </FadeIn>

          <FadeIn delay={CARD_DELAY.THIRD}>
            <PickerMood
              emotion={draft?.emotion}
              onEmotionChange={onEmotionChange}
            />
          </FadeIn>

          <NextButton emotion={draft?.emotion} />
        </S.YStackContainer>

        <MoodBar emotion={draft?.emotion} />
      </S.XStackContainer>
    </S.ViewContainer>
  );
}
