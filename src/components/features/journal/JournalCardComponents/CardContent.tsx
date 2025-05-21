import { StyleSheet, View } from 'react-native'
import { Card, IconButton } from 'react-native-paper'

import { BaseText, RenderTime } from '@/components/shared'
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

  )
}

const styles = StyleSheet.create({
  moodBar: {
    width: 8,
    height: '75%',
    borderRadius: 8,
  },
  contentBox: {
    flex: 1,
    gap: 4,
  },
})
//
// const CardHeader = styled(Card.Header, {
//   padded: true,
//   flex: 1,
//   gap: '$4',
//   items: 'center',
//   flexDirection: 'row',
// })
//
// const MoodBar = styled(View, {
//   width: '$0.75',
//   my: 'auto',
//   height: '75%',
//   rounded: '$8',
//
//   variants: {
//     moodColor: {
//       ':string': bg => {
//         return { bg }
//       },
//     },
//   } as const,
// })
//
// const JournalContentBox = styled(YStack, {
//   flex: 1,
//   gap: '$2',
// })
//
// const JournalContentText = styled(BaseText, {
//   color: '$gray12',
//   flex: 1,
//   numberOfLines: 4,
// })
//
// const TimeText = styled(RenderTime, {
//   fontSize: '$7',
//   lineHeight: 20,
//   color: '$gray9',
//   fontWeight: '800',
// })
