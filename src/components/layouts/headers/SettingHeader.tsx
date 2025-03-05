import { HeaderContainer } from '@/components/layouts/containers/HeaderContainer';
import { Button, View } from 'tamagui';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import { router } from 'expo-router';

export const SettingHeader = () => {
  return (
    <HeaderContainer>
      <Button
        unstyled
        p="$3"
        animation="medium"
        rounded="$4"
        icon={<ArrowLeft size="$1" />}
        onPress={() => router.back()}
        animateOnly={PRESS_STYLE_KEY}
        pressStyle={PRESS_STYLE}
      />
      <View flex={1} />
    </HeaderContainer>
  );
};
