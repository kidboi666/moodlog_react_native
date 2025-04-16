import { X } from '@tamagui/lucide-icons'
import React, { useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'
import { View } from 'tamagui'

const { width, height } = Dimensions.get('window')

interface FullScreenImageModalProps {
  visible: boolean
  imageUri: string
  onClose: () => void
}

export const FullScreenImageModal: React.FC<FullScreenImageModalProps> = ({
  visible,
  imageUri,
  onClose,
}) => {
  // 확대/축소를 위한 Animated 값
  const scale = useRef(new Animated.Value(1)).current
  const [currentScale, setCurrentScale] = useState(1)
  const pinchRef = useRef(null)

  const resetScale = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setCurrentScale(1))
  }

  const zoomIn = () => {
    Animated.timing(scale, {
      toValue: 2,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setCurrentScale(2))
  }

  // 핀치 제스처 처리
  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    { useNativeDriver: true },
  )

  // 핀치 제스처 상태 변경 시 처리
  const onPinchHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      // 핀치 제스처가 끝났을 때
      const newScale = currentScale * event.nativeEvent.scale
      setCurrentScale(newScale)

      scale.setValue(newScale)

      // 너무 작게 축소됐을 경우 원래 크기로 복귀
      if (newScale < 0.9) {
        resetScale()
      }
    }
  }

  // 이미지 길게 누르기 처리
  const handleDoubleTap = () => {
    if (currentScale !== 1) {
      resetScale()
    } else {
      zoomIn()
    }
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='fade'
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <StatusBar hidden={Platform.OS === 'ios'} />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <X size={24} color='white' />
        </TouchableOpacity>

        <PinchGestureHandler
          ref={pinchRef}
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchHandlerStateChange}
        >
          <Animated.View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={onClose}
              onLongPress={handleDoubleTap}
              delayLongPress={200}
            >
              <Animated.Image
                source={{ uri: imageUri }}
                style={[
                  styles.fullImage,
                  {
                    transform: [{ scale }],
                  },
                ]}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </Animated.View>
        </PinchGestureHandler>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width,
    height: height,
    maxWidth: '100%',
    maxHeight: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    right: 20,
    zIndex: 10,
    padding: 5,
  },
})
