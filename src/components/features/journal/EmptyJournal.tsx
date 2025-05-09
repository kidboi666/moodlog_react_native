import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { YStack, styled } from 'tamagui'

import { WriteButton } from '@/components/features/tab'
import { H3 } from '@/components/shared'

export const EmptyJournal = memo(() => {
  const { t } = useTranslation()

  return (
    <EmptyJournalContainer>
      <H3 text='center'>{t('common.fallback.today')}</H3>
      <WriteButton />
    </EmptyJournalContainer>
  )
})

const EmptyJournalContainer = styled(YStack, {
  justify: 'center',
  items: 'center',
  gap: '$3',
  py: '$6',
  px: '$9',
  rounded: '$8',
  bg: '$color4',
})
