import { AnimatePresence } from 'tamagui';
import { Journal } from '@/types/entries';
import { emotionTheme } from '@/constants/themes';
import { memo, useCallback, useEffect, useState } from 'react';
import { router } from 'expo-router';
import * as S from './JournalCard.styled';
import { ChevronRight } from '@tamagui/lucide-icons';

interface Props {
  journal: Journal;
}

export const JournalCard = memo(({ journal }: Props) => {
  const [isPress, setIsPress] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);

  const handlePress = useCallback(() => {
    setIsPress(true);
    setTimeout(() => {
      router.push({
        pathname: '/(tabs)/journal/[journalId]',
        params: { journalId: journal.id },
      });

      setTimeout(() => {
        setIsPress(false);
        setIsLongPress(false);
      }, 100);
    }, 300);
  }, [router]);

  const handleLongPress = useCallback(() => {
    setIsLongPress(true);
  }, []);

  useEffect(() => {
    return () => {
      setIsPress(false);
      setIsLongPress(false);
    };
  }, []);

  return (
    <S.CardContainer
      isLongPress={isLongPress}
      onLongPress={handleLongPress}
      onPress={handlePress}
    >
      <S.CardHeader>
        <S.Content>
          <S.MoodBar
            moodColor={
              emotionTheme[journal.emotion.type][journal.emotion.level]
            }
          />
          <S.JournalContentBox>
            <S.TimeText createdAt={journal.createdAt} />
            <S.JournalContentText>{journal.content ?? ''}</S.JournalContentText>
          </S.JournalContentBox>
          <S.RightChevronButton icon={ChevronRight} />
        </S.Content>
      </S.CardHeader>

      {journal.imageUri && (
        <S.CardBackground>
          <S.JournalCoverImage source={{ uri: journal.imageUri }} />
          <AnimatePresence>
            {!isPress && <S.ImageCoverGradient />}
          </AnimatePresence>
        </S.CardBackground>
      )}
    </S.CardContainer>
  );
});
