import { AnimatePresence, Card, Image } from 'tamagui';
import { Journal } from '@/types/entries';
import { emotionTheme } from '@/constants/themes';
import { ChevronRight } from '@tamagui/lucide-icons';
import { LinearGradient } from 'tamagui/linear-gradient';
import { useCallback, useState } from 'react';
import { router } from 'expo-router';
import * as S from './JournalCard.styled';

interface Props {
  journal: Journal;
}

export const JournalCard = ({ journal }: Props) => {
  const [isPress, setIsPress] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);

  const handlePress = useCallback(() => {
    setIsPress(true);
    setTimeout(() => {
      router.push({
        pathname: '/(tabs)/journal/[journalId]',
        params: { journalId: journal.id },
      });
    }, 300);
  }, [router]);

  const handleLongPress = useCallback(() => {
    setIsLongPress(true);
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
          <ChevronRight size="$1" />
        </S.Content>
      </S.CardHeader>

      {journal.imageUri && (
        <Card.Background rounded="$8">
          <Image
            animation="medium"
            opacity={0.6}
            objectFit="cover"
            source={{ uri: journal.imageUri }}
            width="100%"
            height="100%"
          />
          <AnimatePresence>
            {!isPress && (
              <LinearGradient
                animation="quick"
                exitStyle={{
                  opacity: 0,
                }}
                width="100%"
                height="100%"
                colors={['$gray5', 'rgba(0,0,0,0)']}
                start={[0, 0]}
                end={[2.4, 0]}
                // 이미지 위에 그라디언트 위치하도록
                position="absolute"
                pointerEvents="none"
              />
            )}
          </AnimatePresence>
        </Card.Background>
      )}
    </S.CardContainer>
  );
};
