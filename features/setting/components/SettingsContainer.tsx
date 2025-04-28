import { PropsWithChildren } from 'react'
import { View } from 'tamagui'

import { BaseText } from '@/shared/components'

interface Props {
  title?: string
}

export const SettingsContainer = ({
  children,
  title,
}: PropsWithChildren<Props>) => {
  return (
    <View gap='$3'>
      {title && <BaseText ml='$5'>{title}</BaseText>}
      <View rounded='$4' bg='$color4'>
        {children}
      </View>
    </View>
  )
}
