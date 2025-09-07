import { Feather } from '@expo/vector-icons'
import { memo } from 'react'
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
import { PinchGestureHandler } from 'react-native-gesture-handler'
import { IconButton } from 'react-native-paper'

import { useImageZoom } from '@/src/features/journal/hooks/useImageZoom'
import { Maybe } from '@/src/shared/types'

interface Props {
  visible: boolean
  imageUri: Maybe<string>
  onClose: () => void
}

function _FullScreenImageModal({ visible, imageUri, onClose }: Props) {
  const {
    scale,
    pinchRef,
    onLongPress,
    onPinchGestureEvent,
    onPinchHandlerStateChange,
  } = useImageZoom()

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
              onLongPress={onLongPress}
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
