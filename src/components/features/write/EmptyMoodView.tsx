import { Plus } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { YStack, styled } from 'tamagui'

import { H3, PressableButton } from '@/components/shared'

export function EmptyMoodView() {
  const router = useRouter()
  const { t } = useTranslation()

  const handleCreateMood = () => {
    router.push('/(write)/mood')
  }

  return (
    <Container>
      <H3 text='center'>{t('moods.my.noMoods')}</H3>
      <PressableButton onPress={handleCreateMood} icon={Plus}>
        {t('moods.my.createMoods')}
      </PressableButton>
    </Container>
  )
}

const Container = styled(YStack, {
  flex: 1,
  justify: 'center',
  items: 'center',
  gap: '$4',
  p: '$4',
})
