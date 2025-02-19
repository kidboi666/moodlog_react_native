import { H1, View } from 'tamagui';
import { useEffect, useState } from 'react';

interface Props {
  duration?: number;
}

export const ShakeHand = ({ duration = 3000 }: Props) => {
  const [isRotate, setIsRotate] = useState(false);
  const [isShaking, setIsShaking] = useState(true);

  useEffect(() => {
    let shakeInterval: NodeJS.Timeout;

    if (isShaking) {
      shakeInterval = setInterval(() => {
        setIsRotate(prev => !prev);
      }, 300);
    }

    const stopTimer = setTimeout(() => {
      setIsShaking(false);
      setIsRotate(false);
    }, duration);

    return () => {
      clearInterval(shakeInterval);
      clearTimeout(stopTimer);
    };
  }, [duration, isShaking]);

  return (
    <View animation="quick" rotate={isRotate ? '40deg' : '0deg'}>
      <H1>👋</H1>
    </View>
  );
};
