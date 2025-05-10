import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { YStack } from 'tamagui'

import { BaseText, H3, PressableButton } from '@/components/shared'
import type { BottomSheetProps, BottomSheetType } from '@/types'
import { BottomSheetContainer } from '../../BottomSheetContainer'

function _DeleteMoodModal({
  moodId,
  onDelete,
  isLoading,
  hideBottomSheet,
}: BottomSheetProps[BottomSheetType.DELETE_MOOD]) {
  const { t } = useTranslation()
  const [isSuccess, setIsSuccess] = useState(false)

  const handleDelete = useCallback(() => {
    onDelete(moodId)
    setIsSuccess(true)
  }, [moodId, onDelete, hideBottomSheet])

  useEffect(() => {
    if (isSuccess) {
      hideBottomSheet()
    }

    return () => {
      setIsSuccess(false)
    }
  }, [isSuccess])

  const isDisabled = isLoading || isSuccess

  return (
    <BottomSheetContainer>
      <H3 text='center'>{t('modals.deleteMood.title')}</H3>
      <BaseText color='$color11'>{t('modals.deleteMood.description')}</BaseText>
      <YStack gap='$3' mt='$2'>
        <PressableButton
          bg='$red9'
          color='white'
          onPress={handleDelete}
          disabled={isDisabled}
          loading={isLoading}
        >
          {t('common.delete')}
        </PressableButton>
        <PressableButton onPress={hideBottomSheet} disabled={isDisabled}>
          {t('common.cancel')}
        </PressableButton>
      </YStack>
    </BottomSheetContainer>
  )
}

export const DeleteMoodModal = memo(_DeleteMoodModal)

DeleteMoodModal.displayName = 'DeleteMoodModal'
