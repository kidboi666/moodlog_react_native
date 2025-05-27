import { useQuery } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AiResponseCard } from '@/components/features/journal'
import { FullScreenImageModal, H3 } from '@/components/shared'
import { Colors, DelayMS } from '@/constants'
import { JournalQueries } from '@/queries'
import { MoodName } from '@/types'
import { toSingle } from '@/utils'

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
      entering={FadeIn.duration(DelayMS.ANIMATION.LONG)}
      style={styles.container}
    >
      <View style={styles.rowBox}>
        <View
          style={[
            styles.moodBar,
            { backgroundColor: Colors.mood[journal?.moodName as MoodName] },
          ]}
        />
        <View style={styles.contentBox}>
          <View style={styles.moodBox}>
            <H3 style={{ color: Colors.mood[journal?.moodName as MoodName] }}>
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
        <AiResponseCard
          aiResponse={journal.aiResponse}
          aiResponseAt={journal.aiResponseAt}
        />
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
