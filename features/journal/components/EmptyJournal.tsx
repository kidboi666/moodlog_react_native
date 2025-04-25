import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { YStack } from 'tamagui'

import { WriteButton } from '@/features/tab/components'
import { H3 } from '@/shared/components'

export const EmptyJournal = memo(() => {
  const { t } = useTranslation()

  return (
    <YStack
      justify='center'
      items='center'
      gap='$3'
      p='$6'
      px='$9'
      rounded='$8'
      bg='$gray4'
      animation='medium'
      enterStyle={{ opacity: 0, scale: 0.9, y: 10 }}
      animateOnly={['opacity', 'scale', 'transform']}
    >
      <H3 text='center' color='$gray12'>
        {t('common.fallback.today')}
      </H3>
      <WriteButton />
    </YStack>
  )
})
