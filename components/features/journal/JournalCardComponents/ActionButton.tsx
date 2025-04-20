import { Trash } from '@tamagui/lucide-icons'
import { AnimatePresence } from 'tamagui'

import { PressableButton } from '@/components/shared/PressableButton'
import { Position } from '@/types'
import * as S from './JournalCard.styled'

interface ActionButtonProps {
  cardPosition: Position
  openDeleteSheet: (id: string) => void
  id: string
}

export const ActionButton = ({
  cardPosition,
  openDeleteSheet,
  id,
}: ActionButtonProps) => {
  return (
    <AnimatePresence>
      {cardPosition === Position.LEFT && (
        <S.ActionBox>
          <PressableButton
            circular={true}
            chromeless={true}
            scaleIcon={1.5}
            bg='$red10'
            color='white'
            shadowColor='#000'
            shadowOffset={{ width: 0, height: 1 }}
            shadowOpacity={0.2}
            shadowRadius={1.5}
            elevation={2}
            icon={Trash}
            onPress={() => openDeleteSheet(id)}
          />
        </S.ActionBox>
      )}
    </AnimatePresence>
  )
}
