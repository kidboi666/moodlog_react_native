import { memo } from 'react'

import type { Journal } from '@/types/journal.types'
import { ArrowLeft, Trash2 } from '@tamagui/lucide-icons'
import * as S from './JournalHeader.styled'

interface Props {
  journal: Journal
  onDeletePress: () => void
  onBackPress: () => void
}

export const JournalHeader = memo(
  ({ journal, onDeletePress, onBackPress }: Props) => {
    return (
      <>
        <S.HeaderContainer>
          <S.BackButton icon={ArrowLeft} onPress={onBackPress} />
          <S.DateContainer>
            <S.DateText localDate={journal.localDate} />
            <S.DayWithTimeBox>
              <S.DayText createdAt={journal.createdAt} />
              <S.TimeText createdAt={journal.createdAt} />
            </S.DayWithTimeBox>
          </S.DateContainer>

          <S.DeleteButton icon={Trash2} onPress={onDeletePress} />
        </S.HeaderContainer>
      </>
    )
  },
)
