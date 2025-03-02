import { HeaderContainer } from '@/components/layouts/containers/HeaderContainer';
import { Button, View } from 'tamagui';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { PRESS_STYLE } from '@/constants/styles';
import { router } from 'expo-router';

export const SettingHeader = () => {
  return (
    <HeaderContainer>
      <Button
        p="$2"
        unstyled
        rounded="$2"
        icon={<ArrowLeft size="$1" />}
        onPress={() => router.back()}
        pressStyle={PRESS_STYLE}
      />
      <View flex={1} />
    </HeaderContainer>
  );
};
