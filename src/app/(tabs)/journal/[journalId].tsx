import { Trash } from '@tamagui/lucide-icons'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import {
  GetThemeValueForKey,
  ScrollView,
  Image as TamaguiImage,
  View,
  XStack,
  YStack,
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
import { useDeleteJournal } from '@/hooks'
import { JournalQueries } from '@/queries'
import { useApp } from '@/store'
import { CommonUtils } from '@/utils'

export default function JournalScreen() {
  const params = useLocalSearchParams()
  const router = useRouter()
  const { t } = useTranslation()
  const journalId = CommonUtils.toSingle(params.journalId)
  const isNewJournal = CommonUtils.toSingle(params.isNewJournal)
  const { data: journal } = useQuery(JournalQueries.getJournalById(journalId))
  const fontSize = useApp(state => state.settings.fontSize)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const { openDeleteSheet } = useDeleteJournal(() => router.replace('/'))

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

  if (!journal) return null

  return (
    <Fragment>
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
            >
              <YStack items='center'>
                <RenderDate localDate={journal.localDate} />
                <RenderTime createdAt={journal.createdAt} />
              </YStack>
            </HeaderContent>
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
              bg={journal.mood.color as GetThemeValueForKey<'backgroundColor'>}
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
                  {t(`moods.levels.${journal.mood.level}`)}
                </H3>
                <H3
                  color={
                    journal.mood.color as GetThemeValueForKey<'backgroundColor'>
                  }
                >
                  {journal.mood.name}
                </H3>
              </XStack>
              {Array.isArray(journal.imageUri) && (
                <ScrollView horizontal>
                  <XStack
                    animation='bouncy'
                    enterStyle={{ opacity: 0, scale: 0.9, y: 10 }}
                    elevation='$2'
                  >
                    {journal.imageUri.map(uri => (
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
                {journal.content}
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
    </Fragment>
  )
}
