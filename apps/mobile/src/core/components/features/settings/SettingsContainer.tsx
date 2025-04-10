import type { PropsWithChildren } from 'react'
import { Text, View, YStack } from 'tamagui'

interface Props {
  title: string
}

export const SettingsContainer = ({
  children,
  title,
}: PropsWithChildren<Props>) => {
  return (
    <View gap='$3'>
      <Text ml='$5'>{title}</Text>
      <YStack gap='$4'>{children}</YStack>
    </View>
  )
}
