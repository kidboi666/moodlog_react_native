import { Feather } from '@expo/vector-icons'
import { memo, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'
import { IconButton } from 'react-native-paper'

import { Maybe } from '@/src/shared/types'

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
      <View style={styles.container}>
        <StatusBar hidden={Platform.OS === 'ios'} />
        <IconButton
          icon={() => <Feather name='x' color='white' size={24} />}
          style={styles.xButton}
          onPress={onClose}
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

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
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
  xButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 20,
    zIndex: 10,
    padding: 5,
  },
})

export const FullScreenImageModal = memo(_FullScreenImageModal)

FullScreenImageModal.displayName = 'FullScreenImageModal'
