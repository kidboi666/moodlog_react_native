import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Spinner } from 'tamagui'

import type {
  BottomSheetProps,
  BottomSheetType,
} from '@/types/bottom-sheet.types'
import * as S from './DeleteJournalModal.styled'

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
      await onDelete(journalId)
      hideBottomSheet()
      setIsSuccess(true)
    }, [onDelete, journalId])

    useEffect(() => {
      if (isSuccess) {
        onSuccess?.()
      }

      return () => {
        setIsSuccess(false)
      }
    }, [isSuccess])

    const isDisabled = useMemo(
      () => isLoading || isSuccess,
      [isLoading, isSuccess],
    )

    return (
      <S.BottomSheetContainer>
        <S.ModalTitle>{t('modals.deleteJournal.title')}</S.ModalTitle>
        <S.ModalDescription>
          {t('modals.deleteJournal.description')}
        </S.ModalDescription>
        <S.ModalContentYStack>
          <S.ConfirmButton onPress={handleDelete} disabled={isDisabled}>
            {isDisabled ? (
              <Spinner color='$color12' />
            ) : (
              t('common.button.delete')
            )}
          </S.ConfirmButton>
          <S.CancelButton onPress={hideBottomSheet} disabled={isDisabled}>
            {t('common.button.cancel')}
          </S.CancelButton>
        </S.ModalContentYStack>
      </S.BottomSheetContainer>
    )
  },
)
