import { NotebookPen } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, YStack } from 'tamagui'

import { WriteButton } from '@/components/features/tab/WriteButton'
import { H3, H5 } from '@/components/shared/Heading'

interface Props {
  isToday: boolean
}

export const EmptyJournal = memo(({ isToday }: Props) => {
  const { t } = useTranslation()
  const toast = useToastController()

  return isToday ? (
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
  ) : (
    <Button
      unstyled
      p='$6'
      justify='center'
      items='center'
      gap='$3'
      animation='medium'
      enterStyle={{ opacity: 0, scale: 0.9, y: 10 }}
      animateOnly={['opacity', 'scale', 'transform']}
      onPress={() =>
        toast.show(t('notifications.warning.journal.title'), {
          preset: 'error',
        })
      }
    >
      <NotebookPen size='$1' color='$gray10' />
      <H3 color='$gray10'>{t('common.fallback.empty.title')}</H3>
      <H5 color='$gray10'>{t('common.fallback.empty.description')}</H5>
    </Button>
  )
})
