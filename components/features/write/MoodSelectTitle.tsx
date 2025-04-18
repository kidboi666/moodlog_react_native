import { useTranslation } from 'react-i18next'
import { View, XStack } from 'tamagui'

import { H3 } from '@/components/shared/Heading'
import { ShakeEmoji } from '@/components/shared/ShakeEmoji'

export const MoodSelectTitle = () => {
  const { t } = useTranslation()
  return (
    <View>
      <XStack>
        <ShakeEmoji emoji='🫥' duration={3000} />
      </XStack>
      <H3 fontWeight='800'>{t('placeholders.mood')}</H3>
    </View>
  )
}
