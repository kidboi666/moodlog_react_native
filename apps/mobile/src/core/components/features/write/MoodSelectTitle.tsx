import { useTranslation } from 'react-i18next'
import { View, XStack } from 'tamagui'

import { ShakeEmoji } from '@/core/components/shared/ShakeEmoji'
import * as S from './MoodSelectTitle.styled'

export const MoodSelectTitle = () => {
  const { t } = useTranslation()
  return (
    <View>
      <XStack>
        <ShakeEmoji emoji='🫥' duration={3000} />
      </XStack>
      <S.Title>{t('placeholders.mood')}</S.Title>
    </View>
  )
}
