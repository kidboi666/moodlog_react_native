import { Trash } from '@tamagui/lucide-icons'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import {
  ScrollView,
  Image as TamaguiImage,
  View,
  XStack,
  YStack,
  styled,
} from 'tamagui'

import { FullScreenImageModal } from '@/components/features/modal'
import {
  BaseText,
  H3,
  HeaderContent,
  RenderDate,
  RenderTime,
  ViewContainer,
} from '@/components/shared'
import { Layout } from '@/constants'
import { JournalQueries } from '@/queries'
import { useApp, useBottomSheet } from '@/store'
import { BottomSheetType } from '@/types'
import { toSingle } from '@/utils'

export default function JournalScreen() {
  const { journalId, isNewJournal } = useLocalSearchParams()
  const router = useRouter()
  const { t } = useTranslation()
  const { data: journal } = useQuery(
    JournalQueries.getJournalById(Number(toSingle(journalId))),
  )
  const fontSize = useApp(state => state.settings.fontSize)
  const hideBottomSheet = useBottomSheet(state => state.hideBottomSheet)
  const showBottomSheet = useBottomSheet(state => state.showBottomSheet)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')

  const handleGoBack = () => {
    isNewJournal === 'true' ? router.dismiss(2) : router.back()
  }

  const handleDeleteSheetOpen = () => {
    if (!journal) return

    showBottomSheet(BottomSheetType.DELETE_JOURNAL, Layout.SNAP_POINTS.DELETE, {
      journalId: Number(toSingle(journalId)),
      hideBottomSheet,
      localDate: journal.localDate,
    })
  }
  const handleImagePress = (uri: string) => {
    setSelectedImage(uri)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  if (!journal) return null

  return (
    <ScrollView overScrollMode='always'>
      <Container
        Header={
          <HeaderContent
            leftAction={handleGoBack}
            rightAction={handleDeleteSheetOpen}
            rightActionIcon={Trash}
          >
            <TimeZone>
              <RenderDate localDate={journal.localDate} />
              <RenderTime createdAt={journal.createdAt} />
            </TimeZone>
          </HeaderContent>
        }
      >
        <XStack>
          <MoodBar moodColor={journal.mood?.color} />
          <ContentContainer>
            <MoodContainer>
              <MoodLevel>{t(`moods.levels.${journal.moodLevel}`)}</MoodLevel>
              <MoodName moodColor={journal.mood?.color}>
                {journal.mood?.name}
              </MoodName>
            </MoodContainer>
            {Array.isArray(journal.imageUri) && (
              <ScrollView horizontal>
                <ImageContainer>
                  {journal.imageUri.map(uri => (
                    <TouchableOpacity
                      key={uri}
                      onPress={() => handleImagePress(uri)}
                    >
                      <Image source={{ uri }} />
                    </TouchableOpacity>
                  ))}
                </ImageContainer>
              </ScrollView>
            )}

            <ContentText fontSize={fontSize}>{journal.content}</ContentText>
          </ContentContainer>
        </XStack>
      </Container>

      <FullScreenImageModal
        visible={modalVisible}
        imageUri={selectedImage}
        onClose={handleCloseModal}
      />
    </ScrollView>
  )
}

const Container = styled(ViewContainer, {
  edges: ['bottom'],
  px: 0,
  gap: '$6',
})

const TimeZone = styled(YStack, {
  items: 'center',
})

const MoodBar = styled(View, {
  width: '3%',
  animation: 'medium',
  animateOnly: ['transform'],
  enterStyle: { x: -20 },
  borderTopRightRadius: '$4',
  borderBottomRightRadius: '$4',
  variants: {
    moodColor: {
      ':string': bg => ({ bg }),
    },
  },
})

const ContentContainer = styled(YStack, {
  flex: 1,
  gap: '$4',
})

const MoodContainer = styled(XStack, {
  gap: '$2',
  self: 'flex-start',
  ml: '$3',
  justify: 'center',
  animation: 'bouncy',
  enterStyle: { opacity: 0, scale: 0.9, y: 10 },
})

const MoodLevel = styled(H3, {
  color: '$color11',
})

const MoodName = styled(H3, {
  variants: {
    moodColor: {
      ':string': color => ({ color }),
    },
  },
})

const ImageContainer = styled(XStack, {
  animation: 'bouncy',
  enterStyle: { opacity: 0, scale: 0.9, y: 10 },
  elevation: '$2',
})

const ContentText = styled(BaseText, {
  ml: '$3',
  pr: '$4',
})

const Image = styled(TamaguiImage, {
  width: 300,
  height: 300,
  rounded: '$8',
  ml: '$4',
})
