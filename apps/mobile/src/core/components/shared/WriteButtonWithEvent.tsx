import { Plus } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SELECT_MOOD_SNAP_POINTS } from '@/core/constants/size'
import { useBottomSheet } from '@/core/store/bottom-sheet.store'
import { BottomSheetType } from '@/types/bottom-sheet.types'
import * as S from './WriteButtonWithEvent.styled'

export const WriteButtonWithEvent = memo(() => {
  const showBottomSheet = useBottomSheet(state => state.showBottomSheet)
  const hideBottomSheet = useBottomSheet(state => state.hideBottomSheet)
  const toast = useToastController()
  const { t } = useTranslation()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleWriteButtonPress = useCallback(() => {
    showBottomSheet(BottomSheetType.SELECT_MOOD, SELECT_MOOD_SNAP_POINTS, {
      hideBottomSheet,
    })
  }, [showBottomSheet, isSubmitted, hideBottomSheet])

  useEffect(() => {
    if (isSubmitted) {
      hideBottomSheet()
      const timer = setTimeout(() => setIsSubmitted(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isSubmitted, hideBottomSheet])

  useEffect(() => {}, [])

  return (
    <S.WriteTabContainer>
      <S.WriteButton onPress={handleWriteButtonPress}>
        <S.IconBox>
          <Plus size='$1' color='$color1' />
        </S.IconBox>
      </S.WriteButton>
    </S.WriteTabContainer>
  )
})
