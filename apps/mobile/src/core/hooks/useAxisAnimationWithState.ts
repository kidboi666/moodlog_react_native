import { useCallback, useEffect, useState } from 'react';

import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type AnimationAxis = 'x' | 'y';

interface Props<T> {
  defaultState: T;
  nextState: T;
  startValue: number;
  endValue: number;
  duration?: number;
  threshold?: number;
}

export const useAxisAnimationWithState = <T>(
  axis: AnimationAxis,
  {
    defaultState,
    nextState,
    startValue,
    endValue,
    duration = 300,
    threshold = 50,
  }: Props<T>,
) => {
  const [state, setState] = useState(defaultState);
  const translateValue = useSharedValue(startValue);

  const animatedStyle = useAnimatedStyle(() => ({
    transform:
      axis === 'y'
        ? [{ translateY: translateValue.value }]
        : [{ translateX: translateValue.value }],
  }));

  const toggleState = useCallback(() => {
    setState(prev => (prev === defaultState ? nextState : defaultState));
  }, [defaultState, nextState]);

  const changeStateByCondition = useCallback(
    (condition: boolean) => {
      setState(condition ? nextState : defaultState);
    },
    [defaultState, nextState],
  );

  const updateTranslate = useCallback(
    (translation: number) => {
      if (state === defaultState) {
        translateValue.value = startValue + translation;
      } else {
        if (translation < 0) {
          translateValue.value = endValue;
        } else {
          translateValue.value = endValue + translation;
        }
      }
    },
    [state, defaultState, startValue, endValue, translateValue],
  );

  const handleGestureEnd = useCallback(
    (finalTranslation: number) => {
      if (state === defaultState) {
        if (finalTranslation < -threshold) {
          setState(nextState);
        } else {
          setState(defaultState);
        }
      } else {
        if (finalTranslation > threshold) {
          setState(defaultState);
        } else {
          setState(nextState);
        }
      }
    },
    [state, defaultState, nextState, threshold],
  );

  useEffect(() => {
    translateValue.value = withTiming(
      state === defaultState ? startValue : endValue,
      {
        duration,
        easing: Easing.inOut(Easing.cubic),
      },
    );
  }, [state, startValue, endValue, duration, translateValue]);

  return {
    state,
    animatedStyle,
    toggleState,
    changeStateByCondition,
    updateTranslate,
    handleGestureEnd,
  };
};
