import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { YStack } from 'tamagui'

import { BaseText, H3, PressableButton } from '@/components/shared'
import type { BottomSheetProps, BottomSheetType } from '@/types'
import { BottomSheetContainer } from '../../BottomSheetContainer'

export const DeleteJournalModal = memo(
  ({
    journalId,
    isLoading,
    hideBottomSheet,
    onDelete,
  }: BottomSheetProps[BottomSheetType.DELETE_JOURNAL]) => {
    const { t } = useTranslation()
    const [isSuccess, setIsSuccess] = useState(false)

    const handleDelete = useCallback(() => {
      onDelete(journalId)
      setIsSuccess(true)
    }, [journalId, onDelete, hideBottomSheet])

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
