import { useApp, useJournal } from '@/store'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { toSingle } from 'shared/utils'
import {
  ScrollView,
  Image as TamaguiImage,
  View,
  XStack,
  YStack,
} from 'tamagui'

import { JournalHeader } from '@/features/journal/components/JournalHeader'
import { useDeleteJournal } from '@/features/journal/hooks/useDeleteJournal'
import { FullScreenImageModal } from '@/features/modal/components/contents/FullScreenImageModal'
import { BaseText, H3, ViewContainer } from '@/shared/components'

export default function Screen() {
  const { id } = useLocalSearchParams()
  const journalId = toSingle(id)
  const router = useRouter()
  const { t } = useTranslation()
  const selectedJournal = useJournal(state => state.selectedJournal)
  const selectJournal = useJournal(state => state.selectJournal)
  const fontSize = useApp(state => state.settings.fontSize)
  const { openDeleteSheet } = useDeleteJournal()

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')

  const handleImagePress = (uri: string) => {
    setSelectedImage(uri)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    selectJournal(toSingle(journalId))
  }, [journalId])

  if (!selectedJournal || selectedJournal?.id !== journalId) return null

  return (
    <ScrollView overScrollMode='always'>
      <ViewContainer
        edges={['bottom']}
        px={0}
        gap='$6'
        Header={
          <JournalHeader
            journal={selectedJournal}
            onDeletePress={() => openDeleteSheet(journalId)}
            onBackPress={() => router.back()}
          />
        }
      >
        <XStack>
          <View
            width='3%'
            animation='medium'
            animateOnly={['transform']}
            enterStyle={{ x: -20 }}
            borderTopRightRadius='$4'
            borderBottomRightRadius='$4'
            bg={selectedJournal.mood.color as any}
          />
          <YStack flex={1} gap='$4'>
            <XStack
              gap='$2'
              self='flex-start'
              ml='$3'
              justify='center'
              animation='bouncy'
              enterStyle={{ opacity: 0, scale: 0.9, y: 10 }}
            >
              <H3 color='$gray11'>
                {t(`moods.levels.${selectedJournal.mood.level}`)}
              </H3>
              <H3>{selectedJournal.mood.name}</H3>
            </XStack>
            {Array.isArray(selectedJournal.imageUri) && (
              <ScrollView horizontal>
                <XStack
                  animation='bouncy'
                  enterStyle={{ opacity: 0, scale: 0.9, y: 10 }}
                  elevation='$2'
                >
                  {selectedJournal.imageUri.map(uri => (
                    <TouchableOpacity
                      key={uri}
                      onPress={() => handleImagePress(uri)}
                    >
                      <TamaguiImage
                        source={{ uri }}
                        width={300}
                        height={300}
                        rounded='$8'
                        ml='$4'
                      />
                    </TouchableOpacity>
                  ))}
                </XStack>
              </ScrollView>
            )}

            <BaseText ml='$3' pr='$4' fontSize={fontSize}>
              {selectedJournal.content}
            </BaseText>
          </YStack>
        </XStack>
      </ViewContainer>

      <FullScreenImageModal
        visible={modalVisible}
        imageUri={selectedImage}
        onClose={handleCloseModal}
      />
    </ScrollView>
  )
}
