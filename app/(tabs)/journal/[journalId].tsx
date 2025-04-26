import { Trash } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import {
  ScrollView,
  Image as TamaguiImage,
  View,
  XStack,
  YStack,
} from 'tamagui'

import { useDeleteJournal } from '@/features/journal/hooks'
import { FullScreenImageModal } from '@/features/modal'
import { BaseText, H3, HeaderContent, ViewContainer } from '@/shared/components'
import { useApp, useJournal } from '@/shared/store'
import { toSingle } from '@/shared/utils'

export default function JournalScreen() {
  const params = useLocalSearchParams()
  const journalId = toSingle(params.journalId)
  const isNewJournal = toSingle(params.isNewJournal)
  const router = useRouter()
  const { t } = useTranslation()
  const { openDeleteSheet } = useDeleteJournal(() => router.replace('/'))
  const selectedJournal = useJournal(state => state.selectedJournal)
  const selectJournal = useJournal(state => state.selectJournal)
  const fontSize = useApp(state => state.settings.fontSize)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')

  const handleGoBack = () => {
    isNewJournal === 'true' ? router.dismiss(2) : router.back()
  }

  const handleImagePress = (uri: string) => {
    setSelectedImage(uri)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    selectJournal(journalId)
  }, [journalId])

  if (!selectedJournal || selectedJournal?.id !== journalId) return null

  return (
    <>
      <ScrollView overScrollMode='always'>
        <ViewContainer
          edges={['bottom']}
          px={0}
          gap='$6'
          Header={
            <HeaderContent
              leftAction={handleGoBack}
              rightAction={() => openDeleteSheet(journalId)}
              rightActionIcon={Trash}
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
              bg={selectedJournal.mood as any}
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
    </>
  )
}
