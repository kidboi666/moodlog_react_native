import { HeaderContainer } from '@/components/layouts/containers/HeaderContainer';
import { Button, View } from 'tamagui';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { PRESS_STYLE } from '@/constants/styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/routers';

interface Props {
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
}

export const SettingHeader = ({ navigation }: Props) => {
  return (
    <HeaderContainer>
      <Button
        p="$2"
        unstyled
        rounded="$2"
        icon={<ArrowLeft size="$1" />}
        onPress={() => navigation.goBack()}
        pressStyle={PRESS_STYLE}
      />
      <View flex={1} />
    </HeaderContainer>
  );
};
