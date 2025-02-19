import { useFadeIn } from '@/hooks/useFadeIn';
import { View, ViewProps } from 'tamagui';
import { ENTER_STYLE } from '@/constants/styles';

interface Props extends ViewProps {
  delay?: number;
}

export const FadeIn = ({ delay = 1000, children, ...props }: Props) => {
  const { isVisible, item } = useFadeIn({ delay, item: children });

  return (
    <View
      animation="medium"
      enterStyle={ENTER_STYLE}
      opacity={isVisible ? 1 : 0}
      {...props}
    >
      {item}
    </View>
  );
};
