import { HeaderContainer } from '@/components/containers/HeaderContainer';
import { Button, View, XStack } from 'tamagui';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { PRESS_STYLE } from '@/constants/styles';
import { ParamListBase } from '@react-navigation/routers';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const RecordHeader = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
}) => {
  return (
    <HeaderContainer>
      <XStack>
        <Button
          p="$2"
          unstyled
          rounded="$2"
          icon={<ArrowLeft size="$1" />}
          onPress={() => navigation.goBack()}
          pressStyle={PRESS_STYLE}
        />
        <View flex={1} />
      </XStack>
    </HeaderContainer>
  );
};
