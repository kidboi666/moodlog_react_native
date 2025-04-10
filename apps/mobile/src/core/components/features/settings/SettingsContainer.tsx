import type { PropsWithChildren } from 'react'
import { Text, View } from 'tamagui'

interface Props {
  title?: string
}

export const SettingsContainer = ({
  children,
  title,
}: PropsWithChildren<Props>) => {
  return (
    <View gap='$3'>
      {title && (
        <Text ml='$5' color='$color11'>
          {title}
        </Text>
      )}
      <View rounded='$4' bg='$color4'>
        {children}
      </View>
    </View>
  )
}
