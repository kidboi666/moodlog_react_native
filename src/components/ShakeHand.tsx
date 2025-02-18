import { H1, View } from 'tamagui';
import { useEffect, useState } from 'react';

export const ShakeHand = () => {
  const [isRotate, setIsRotate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRotate(prev => !prev);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <View animation="quick" rotate={isRotate ? '40deg' : '0deg'}>
      <H1>👋</H1>
    </View>
  );
};
