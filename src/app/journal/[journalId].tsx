import { useQuery } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'

import { FullScreenImageModal } from '@/components/features/modal'
import { BaseText, H3, ScreenView } from '@/components/shared'
import { useThemedStyles } from '@/hooks'
import { JournalQueries } from '@/queries'
import { toSingle } from '@/utils'

export default function JournalScreen() {
  const { journalId } = useLocalSearchParams()
  const { t } = useTranslation()
  const { data: journal } = useQuery(
    JournalQueries.getJournalById(Number(toSingle(journalId))),
  )
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')

  const handleImagePress = (uri: string) => {
    setSelectedImage(uri)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const themedStyles = useThemedStyles(({ colors }) => ({
    moodBar: {
      backgroundColor: journal?.mood?.color,
    },
    moodName: {
      color: journal?.mood?.color,
    },
    moodLevel: {
      color: colors.text.secondary,
    },
  }))

  if (!journal) return null

  return (
    <Animated.ScrollView
      entering={FadeIn.duration(800)}
      overScrollMode='always'
    >
      <ScreenView edges={['bottom']} style={styles.container}>
        <View style={styles.rowBox}>
          <View style={[styles.moodBar, themedStyles.moodBar]} />
          <View style={styles.contentBox}>
            <View style={styles.moodBox}>
              <H3 style={themedStyles.moodLevel}>
                {t(`moods.levels.${journal.moodLevel}`)}
              </H3>
              <H3 style={themedStyles.moodName}>{journal.mood?.name}</H3>
            </View>
            {Array.isArray(journal.imageUri) && (
              <ScrollView horizontal>
                <View style={styles.imageBox}>
                  {journal.imageUri.map(uri => (
                    <TouchableOpacity
                      key={uri}
                      onPress={() => handleImagePress(uri)}
                    >
                      <Image style={styles.image} source={uri} />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            )}

            <BaseText style={styles.content}>{journal.content}</BaseText>
          </View>
        </View>
      </ScreenView>

      <FullScreenImageModal
        visible={modalVisible}
        imageUri={selectedImage}
        onClose={handleCloseModal}
      />
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    gap: 12,
  },
  rowBox: {
    flexDirection: 'row',
  },

  moodBar: {
    width: '3%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  contentBox: {
    flex: 1,
    gap: 12,
  },
  moodBox: {
    gap: 8,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 16,
    justifyContent: 'center',
  },
  imageBox: {
    flexDirection: 'row',
    elevation: 8,
  },
  content: {
    marginLeft: 16,
    paddingRight: 18,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginLeft: 16,
  },
})
