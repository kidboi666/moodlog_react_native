import { X } from '@tamagui/lucide-icons'
import { useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'
import { View } from 'tamagui'

const { width, height } = Dimensions.get('window')

interface Props {
  visible: boolean
  imageUri: string
  onClose: () => void
}

export const FullScreenImageModal = ({ visible, imageUri, onClose }: Props) => {
  // =========== 상태 및 Ref ===========
  const [currentScale, setCurrentScale] = useState(1)
  const scale = useRef(new Animated.Value(1)).current
  const pinchRef = useRef(null)

  // =========== 이미지 확대/축소 함수 ===========
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

  // =========== 제스처 핸들러 ===========
  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    { useNativeDriver: true },
  )

  const onPinchHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const newScale = currentScale * (event.nativeEvent.scale || 1)
      setCurrentScale(newScale)
      scale.setValue(newScale)

      if (newScale < 0.9) {
        resetScale()
      }
    }
  }

  const handleLongPress = () => {
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
              onLongPress={handleLongPress}
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
    width,
    height,
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
