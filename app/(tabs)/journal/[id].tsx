import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { ScrollView, XStack } from 'tamagui'

import { DELETE_JOURNAL_SNAP_POINTS } from '@/constants'
import { useApp, useBottomSheet, useJournal } from '@/store'
import { BottomSheetType } from '@/types'
import { toSingle } from '@/utils'

import { JournalHeader } from '@/components/features/journal/JournalHeader'
import { FullScreenImageModal } from '@/components/modals/contents/FullScreenImageModal'
import * as S from '@/styles/screens/journal/Journal.styled'

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
  console.log(selectedJournal)
  return (
    <ScrollView overScrollMode='always'>
      <S.ViewContainer
        edges={['bottom']}
        Header={
          <JournalHeader
            journal={selectedJournal}
            onDeletePress={handleDeletePress}
            onBackPress={() => router.back()}
          />
        }
      >
        <XStack>
          <S.MoodBar moodColor={selectedJournal.mood.color} />
          <S.ContentBox>
            <S.MoodTextBox>
              <S.MoodLevelText>
                {t(`moods.levels.${selectedJournal.mood.level}`)}
              </S.MoodLevelText>
              <S.MoodTypeText>{selectedJournal.mood.name}</S.MoodTypeText>
            </S.MoodTextBox>
            {Array.isArray(selectedJournal.imageUri) && (
              <ScrollView horizontal>
                <S.ImageBox>
                  {selectedJournal.imageUri.map(uri => (
                    <TouchableOpacity
                      key={uri}
                      onPress={() => handleImagePress(uri)}
                    >
                      <S.Image source={{ uri }} />
                    </TouchableOpacity>
                  ))}
                </S.ImageBox>
              </ScrollView>
            )}

            <S.ContentText fontSize={fontSize}>
              {selectedJournal.content}
            </S.ContentText>
          </S.ContentBox>
        </XStack>
      </S.ViewContainer>

      <FullScreenImageModal
        visible={modalVisible}
        imageUri={selectedImage}
        onClose={handleCloseModal}
      />
    </ScrollView>
  )
}
