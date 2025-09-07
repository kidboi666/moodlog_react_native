import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React, { memo } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-paper'

interface Props {
  imageUri: string[]
  onRemoveImage: (index: number) => void
  onAddImage: () => void
}

function _CoverImagePicker({ imageUri, onRemoveImage, onAddImage }: Props) {
  const theme = useTheme()

  return (
    <ScrollView horizontal contentContainerStyle={styles.scrollView}>
      {imageUri.map((uri, index) => (
        <TouchableOpacity key={uri} onPress={() => onRemoveImage(index)}>
          <Image style={styles.image} source={{ uri }} />
        </TouchableOpacity>
      ))}
      {imageUri.length < 3 && (
        <TouchableOpacity
          onPress={onAddImage}
          style={[styles.emptyImage, { borderColor: theme.colors.outline }]}
        >
          <MaterialCommunityIcons
            name='file-image-plus-outline'
            size={40}
            color={theme.colors.outline}
          />
        </TouchableOpacity>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    gap: 16,
  },
  emptyImage: {
    height: 80,
    width: 80,
    borderRadius: 16,
    borderWidth: 1,
    opacity: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
})

export const CoverImagePicker = memo(_CoverImagePicker)
CoverImagePicker.displayName = 'CoverImagePicker'
