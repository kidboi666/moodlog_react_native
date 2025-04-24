import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { View, XStack } from 'tamagui'

// 색상 팔레트 정의
const COLORS = [
  '#FF5733', // 빨강
  '#FFC300', // 노랑
  '#36D7B7', // 민트
  '#3498DB', // 파랑
  '#9B59B6', // 보라
  '#1ABC9C', // 청록
  '#E74C3C', // 밝은 빨강
  '#F39C12', // 주황
  '#2ECC71', // 녹색
  '#8E44AD', // 진한 보라
]

interface ColorPickerProps {
  selectedColor: string
  onColorSelect: (color: string) => void
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  return (
    <XStack>
      <View style={[styles.colorButton, { backgroundColor: selectedColor }]} />
      <View style={styles.spacer} />
      <View style={styles.colorsContainer}>
        {COLORS.map(color => (
          <Pressable
            key={color}
            onPress={() => onColorSelect(color)}
            style={[
              styles.colorOption,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColor,
            ]}
          />
        ))}
      </View>
    </XStack>
  )
}

const styles = StyleSheet.create({
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  spacer: {
    width: 8,
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 200,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 4,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#000',
  },
})
