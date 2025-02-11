import { View } from 'tamagui';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

export const DrawerContent = props => {
  return (
    <View flex={1}>
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};
