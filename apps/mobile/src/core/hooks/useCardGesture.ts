import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

interface CardGestureProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onLongPress: () => void;
  updateTranslate: (x: number) => void;
  onGestureEnd: (x: number) => void;
}

export const useCardGesture = ({
  onSwipeLeft,
  onSwipeRight,
  onLongPress,
  updateTranslate,
  onGestureEnd,
}: CardGestureProps) => {
  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate(event => {
      runOnJS(updateTranslate)(event.translationX);
    })
    .onEnd(event => {
      runOnJS(onGestureEnd)(event.translationX);
      if (event.velocityX < -500 || event.translationX < -50) {
        runOnJS(onSwipeLeft)();
      } else if (event.velocityX > 500 || event.translationX > 50) {
        runOnJS(onSwipeRight)();
      }
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(300)
    .onStart(() => {
      runOnJS(onLongPress)();
    });

  const gesture = Gesture.Exclusive(panGesture, longPressGesture);

  return {
    gesture,
    GestureWrapper: GestureDetector,
  };
};
