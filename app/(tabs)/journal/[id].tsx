import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import {
  ScrollView,
  Image as TamaguiImage,
  View,
  XStack,
  YStack,
} from 'tamagui'

import { DELETE_JOURNAL_SNAP_POINTS } from '@/constants'
import { useApp, useBottomSheet, useJournal } from '@/store'
import { BottomSheetType } from '@/types'
import { toSingle } from '@/utils'

import { JournalHeader } from '@/components/features/journal/JournalHeader'
import { FullScreenImageModal } from '@/components/modals/contents/FullScreenImageModal'
import { BaseText } from '@/components/shared/BaseText'
import { H3 } from '@/components/shared/Heading'
import { ViewContainer } from '@/components/shared/ViewContainer'

export default function Screen() {
  const { id } = useLocalSearchParams()
  const journalId = toSingle(id)
  const router = useRouter()
  const { t } = useTranslation()

  const selectedJournal = useJournal(state => state.selectedJournal)
  const selectJournal = useJournal(state => state.selectJournal)
  const isLoading = useJournal(state => state.isLoading)
  const removeJournal = useJournal(state => state.removeJournal)
  const fontSize = useApp(state => state.settings.fontSize)
  const { showBottomSheet, hideBottomSheet } = useBottomSheet()

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')

  const handleImagePress = (uri: string) => {
    setSelectedImage(uri)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleDeletePress = useCallback(() => {
    showBottomSheet(
      BottomSheetType.DELETE_JOURNAL,
      DELETE_JOURNAL_SNAP_POINTS,
      {
        journalId,
        isLoading,
        onDelete: removeJournal,
        hideBottomSheet,
        onSuccess: () => {
          router.push('/entries')
        },
      },
    )
  }, [
    showBottomSheet,
    journalId,
    isLoading,
    removeJournal,
    router,
    hideBottomSheet,
  ])

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
            onDeletePress={handleDeletePress}
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
