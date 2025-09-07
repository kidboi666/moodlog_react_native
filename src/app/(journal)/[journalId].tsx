import { useQuery } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

import { JournalQueries } from '@/src/data/queries'
import { AiResponseCard } from '@/src/features/journal'
import { FullScreenImageModal, H3 } from '@/src/shared/components'
import { COLORS, DELAY_MS } from '@/src/shared/constants'
import { MoodName } from '@/src/shared/types'
import { toSingle } from '@/src/shared/utils'

const AnimatedScreenView = Animated.createAnimatedComponent(SafeAreaView)

export default function JournalScreen() {
  const { journalId } = useLocalSearchParams()
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

  if (!journal) return null

  return (
    <AnimatedScreenView
      entering={FadeIn.duration(DELAY_MS.ANIMATION.LONG)}
      style={styles.container}
    >
      <View style={styles.rowBox}>
        <View
          style={[
            styles.moodBar,
            { backgroundColor: COLORS.mood[journal?.moodName as MoodName] },
          ]}
        />
        <View style={styles.contentBox}>
          <View style={styles.moodBox}>
            <H3 style={{ color: COLORS.mood[journal?.moodName as MoodName] }}>
              {journal.moodName}
            </H3>
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

          <Text style={styles.content}>{journal.content}</Text>
        </View>
      </View>
      {journal.aiResponseEnabled && (
        <View style={styles.responseBox}>
          <Divider />
          <AiResponseCard
            aiResponse={journal.aiResponse}
            aiResponseAt={journal.aiResponseAt}
          />
        </View>
      )}

      <FullScreenImageModal
        visible={modalVisible}
        imageUri={selectedImage}
        onClose={handleCloseModal}
      />
    </AnimatedScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    flex: 1,
    justifyContent: 'space-between',
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
  responseBox: {
    gap: 16,
  },
})
