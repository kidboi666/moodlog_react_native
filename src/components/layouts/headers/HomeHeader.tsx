import { Button, View } from 'tamagui';
import { Menu } from '@tamagui/lucide-icons';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import { HeaderContainer } from '@/components/layouts/containers/HeaderContainer';
import { useBottomModal } from '@/hooks/useBottomModal';
import { BottomModal } from '@/components/modals/BottomModal';
import { DevContainer } from '@/components/layouts/containers/DevContainer';

export const HomeHeader = () => {
  const { modalRef, openModal } = useBottomModal();
  return (
    <>
      <HeaderContainer>
        <Button
          unstyled
          p="$2"
          rounded="$2"
          icon={<Menu size="$1" />}
          onPress={openModal}
          animation="quick"
          animateOnly={PRESS_STYLE_KEY}
          pressStyle={PRESS_STYLE}
        />
        <View flex={1} />
      </HeaderContainer>

      <BottomModal ref={modalRef}>
        <DevContainer />
      </BottomModal>
    </>
  );
};
