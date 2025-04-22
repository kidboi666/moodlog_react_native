import { useTranslation } from 'react-i18next'
import { View, YStack } from 'tamagui'

import { BaseText, H5 } from '@/components/shared'

export const EmptyContent = () => {
  const { t } = useTranslation()

  return (
    <View
      flex={1}
      justify='space-between'
      animation='quick'
      animateOnly={['opacity']}
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
    >
      <YStack gap='$2'>
        <H5>{t('statistics.empty.title')}</H5>
        <BaseText>{t('statistics.empty.description')}</BaseText>
      </YStack>
    </View>
  )
}
