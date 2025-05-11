import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { Card, View, YStack, styled } from 'tamagui'

import { BaseText, PressableButton, RenderTime } from '@/components/shared'
import { Maybe, Mood } from '@/types'

interface CardContentProps {
  content: Maybe<string>
  createdAt: string
  mood: Mood
  showActionButton: boolean
  toggleState: () => void
}

export function CardContent({
  content,
  createdAt,
  mood,
  showActionButton,
  toggleState,
}: CardContentProps) {
  return (
    <CardHeader>
      <MoodBar moodColor={mood?.color} />
      <JournalContentBox>
        <TimeText createdAt={createdAt} />
        <JournalContentText>{content}</JournalContentText>
      </JournalContentBox>
      <PressableButton
        bg='$backgroundStrong'
        icon={showActionButton ? ChevronRight : ChevronLeft}
        onPress={() => toggleState()}
      />
    </CardHeader>
  )
}

const CardHeader = styled(Card.Header, {
  padded: true,
  flex: 1,
  gap: '$4',
  items: 'center',
  flexDirection: 'row',
})

const MoodBar = styled(View, {
  width: '$0.75',
  my: 'auto',
  height: '75%',
  rounded: '$8',

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg }
      },
    },
  } as const,
})

const JournalContentBox = styled(YStack, {
  flex: 1,
  gap: '$2',
})

const JournalContentText = styled(BaseText, {
  color: '$gray12',
  flex: 1,
  numberOfLines: 4,
})

const TimeText = styled(RenderTime, {
  fontSize: '$7',
  lineHeight: 20,
  color: '$gray9',
  fontWeight: '800',
})
