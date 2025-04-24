import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { YStack } from 'tamagui'

import { BottomSheetContainer } from '@/features/modal/components'
import { BaseText, H3, PressableButton } from '@/shared/components'
import type { BottomSheetProps, BottomSheetType } from 'shared/types'

export const DeleteJournalModal = memo(
  ({
    journalId,
    onDelete,
    isLoading,
    hideBottomSheet,
    onSuccess,
  }: BottomSheetProps[BottomSheetType.DELETE_JOURNAL]) => {
    const { t } = useTranslation()
    const [isSuccess, setIsSuccess] = useState(false)

    const handleDelete = useCallback(async () => {
      onDelete(journalId)
      hideBottomSheet()
      setIsSuccess(true)
    }, [journalId, onDelete, hideBottomSheet])

    useEffect(() => {
      if (isSuccess) {
        onSuccess?.()
      }

      return () => {
        setIsSuccess(false)
      }
    }, [isSuccess])

    const isDisabled = isLoading || isSuccess

    return (
      <BottomSheetContainer>
        <H3 text='center'>{t('modals.deleteJournal.title')}</H3>
        <BaseText color='$color11'>
          {t('modals.deleteJournal.description')}
        </BaseText>
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
  },
)
