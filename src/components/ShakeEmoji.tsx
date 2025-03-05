import { Button, H1 } from 'tamagui';
import { useEffect, useState } from 'react';

interface Props {
  duration?: number;
  emoji: string;
}

export const ShakeEmoji = ({ duration, emoji }: Props) => {
  const [isRotate, setIsRotate] = useState(false);
  const [isShaking, setIsShaking] = useState(true);

  useEffect(() => {
    let shakeInterval: NodeJS.Timeout;
    let stopTimer: NodeJS.Timeout;

    if (isShaking) {
      shakeInterval = setInterval(() => {
        setIsRotate(prev => !prev);
      }, 300);
    }

    if (duration) {
      stopTimer = setTimeout(() => {
        setIsShaking(false);
        setIsRotate(false);
      }, duration);
    }

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
      onPress={() => setIsShaking(prev => !prev)}
      pressStyle={{
        scale: 0.85,
      }}
    >
      <H1>{emoji}</H1>
    </Button>
  );
};
