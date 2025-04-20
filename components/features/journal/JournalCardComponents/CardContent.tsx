import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'

import { PressableButton } from '@/components/shared/PressableButton'
import { Position } from '@/types'
import * as S from './JournalCard.styled'

interface CardContentProps {
  content: string
  createdAt: string
  moodColor?: string
  cardPosition: Position
  toggleState: () => void
}

export const CardContent = ({
  content,
  createdAt,
  moodColor,
  cardPosition,
  toggleState,
}: CardContentProps) => {
  return (
    <S.CardHeader>
      <S.Content>
        <S.MoodBar moodColor={moodColor} />
        <S.JournalContentBox>
          <S.TimeText createdAt={createdAt} />
          <S.JournalContentText>{content}</S.JournalContentText>
        </S.JournalContentBox>
        <PressableButton
          bg='$backgroundStrong'
          icon={cardPosition === Position.CENTER ? ChevronRight : ChevronLeft}
          onPress={() => toggleState()}
        />
      </S.Content>
    </S.CardHeader>
  )
}
