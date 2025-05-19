import { PressableButton } from '@/components/shared'
import { Avatar } from 'tamagui'

interface Props {
  avatarUrl: string
}

export function ProfileAvatar({ avatarUrl }: Props) {
  return (
    <PressableButton onPress={() => console.log('avatar pressed')}>
      <Avatar circular size='$10'>
        <Avatar.Image source={{ uri: avatarUrl, width: 300, height: 300 }} />
        <Avatar.Fallback />
      </Avatar>
    </PressableButton>
  )
}
