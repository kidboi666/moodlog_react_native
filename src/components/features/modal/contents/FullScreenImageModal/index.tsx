import { X } from '@tamagui/lucide-icons'
import { memo, useRef, useState } from 'react'
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
import { Button, View } from 'tamagui'

import { Maybe } from '@/types'

const { width, height } = Dimensions.get('window')

interface Props {
  visible: boolean
  imageUri: Maybe<string>
  onClose: () => void
}

function _FullScreenImageModal({ visible, imageUri, onClose }: Props) {
  const [currentScale, setCurrentScale] = useState(1)
  const scale = useRef(new Animated.Value(1)).current
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
      <View flex={1} bg='rgba(0, 0, 0, 0.9)' justify='center' items='center'>
        <StatusBar hidden={Platform.OS === 'ios'} />

        <Button
          unstyled
          size='$8'
          icon={X}
          position='absolute'
          t={Platform.OS === 'ios' ? 50 : 20}
          r={20}
          z={10}
          p={5}
          onPress={onClose}
          opacity={0.7}
        />

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
                source={{ uri: imageUri! }}
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
  fullImage: {
    width,
    height,
    maxWidth: '100%',
    maxHeight: '100%',
  },
})

export const FullScreenImageModal = memo(_FullScreenImageModal)

FullScreenImageModal.displayName = 'FullScreenImageModal'
