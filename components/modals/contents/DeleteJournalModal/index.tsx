import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { YStack } from 'tamagui'

import { BottomSheetContainer } from '@/components/modals/BottomSheetContainer'
import { BaseText } from '@/components/shared/BaseText'
import { H3 } from '@/components/shared/Heading'
import { PressableButton } from '@/components/shared/PressableButton'
import type { BottomSheetProps, BottomSheetType } from '@/types'

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
