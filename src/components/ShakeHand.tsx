import { Button, H1 } from 'tamagui';
import { useEffect, useState } from 'react';

interface Props {
  duration?: number;
}

export const ShakeHand = ({ duration = 1000 }: Props) => {
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
    <Button
      unstyled
      animation="quick"
      rotate={isRotate ? '40deg' : '0deg'}
      onPress={() => setIsShaking(true)}
    >
      <H1>👋</H1>
    </Button>
  );
};
