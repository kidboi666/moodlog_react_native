import { memo, useCallback } from 'react';

import { useRouter } from 'expo-router';

import { AnimatePresence } from 'tamagui';

import Animated from 'react-native-reanimated';

import * as S from 'src/core/components/features/journal/JournalCard.styled';
import { ChevronLeft, ChevronRight, Trash } from '@tamagui/lucide-icons';

import { moodTheme } from '@/core/constants/themes';
import { useAxisAnimationWithState } from '@/core/hooks/useAxisAnimationWithState';
import { useCardGesture } from '@/core/hooks/useCardGesture';

import { Position } from '@/types/app.types';
import { MoodLevel, MoodType } from '@/types/mood.types';
import { Nullable } from '@/types/utill.types';

const AnimatedCard = Animated.createAnimatedComponent(S.CardContainer);

interface Props {
  content: string;
  id: string;
  createdAt: string;
  imageUri: string[];
  moodType: MoodType;
  moodLevel: MoodLevel;
  openDeleteSheet: (id: string) => void;
}

export const JournalCard = memo(
  ({
    content,
    id,
    createdAt,
    imageUri,
    moodType,
    moodLevel,
    openDeleteSheet,
  }: Props) => {
    const router = useRouter();
    const {
      state: cardPosition,
      animatedStyle,
      toggleState,
      changeStateByCondition,
      updateTranslate,
      handleGestureEnd,
    } = useAxisAnimationWithState('x', {
      defaultState: Position.CENTER,
      nextState: Position.LEFT,
      startValue: 0,
      endValue: -80,
      duration: 300,
    });

    const isOpenCard = cardPosition === Position.LEFT;

    const handleSwipeLeft = useCallback(() => {
      if (cardPosition === Position.CENTER) {
        changeStateByCondition(true);
      }
    }, [cardPosition, toggleState]);

    const handleSwipeRight = useCallback(() => {
      if (cardPosition === Position.LEFT) {
        changeStateByCondition(false);
      }
    }, [cardPosition, toggleState]);

    const { gesture, GestureWrapper } = useCardGesture({
      onSwipeLeft: handleSwipeLeft,
      onSwipeRight: handleSwipeRight,
      onLongPress: () =>
        changeStateByCondition(cardPosition === Position.CENTER),
      updateTranslate,
      onGestureEnd: handleGestureEnd,
    });

    const handlePress = () => {
      if (isOpenCard) {
        toggleState();
      } else {
        router.push({
          pathname: '/journal/[id]',
          params: { id },
        });
      }
    };

    return (
      <>
        <S.Container>
          <AnimatePresence>
            {cardPosition === Position.LEFT && (
              <S.ActionBox>
                <S.DeleteButton
                  icon={Trash}
                  onPress={() => openDeleteSheet(id)}
                />
              </S.ActionBox>
            )}
          </AnimatePresence>

          <GestureWrapper gesture={gesture}>
            <AnimatedCard onPress={handlePress} style={animatedStyle}>
              <S.CardHeader>
                <S.Content>
                  <S.MoodBar moodColor={moodTheme[moodType][moodLevel]} />
                  <S.JournalContentBox>
                    <S.TimeText createdAt={createdAt} />
                    <S.JournalContentText>{content}</S.JournalContentText>
                  </S.JournalContentBox>
                  <S.RightChevronButton
                    icon={
                      cardPosition === Position.CENTER
                        ? ChevronRight
                        : ChevronLeft
                    }
                    onPress={() => toggleState()}
                  />
                </S.Content>
              </S.CardHeader>

              {imageUri.length !== 0 && (
                <S.CardBackground>
                  <S.JournalCoverImage source={{ uri: imageUri[0] }} />
                  <AnimatePresence>
                    {isOpenCard ? null : <S.ImageCoverGradient />}
                  </AnimatePresence>
                </S.CardBackground>
              )}
            </AnimatedCard>
          </GestureWrapper>
        </S.Container>
      </>
    );
  },
);
