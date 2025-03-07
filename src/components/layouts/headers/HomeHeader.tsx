import { Menu } from '@tamagui/lucide-icons';
import { HeaderContainer } from '@/components/layouts/containers/HeaderContainer';
import { useBottomModal } from '@/hooks/useBottomModal';
import { BottomModal } from '@/components/modals/BottomModal';
import { DevContainer } from '@/components/layouts/containers/DevContainer';
import * as S from './HomeHeader.styled';

export const HomeHeader = () => {
  const { modalRef, openModal } = useBottomModal();
  return (
    <>
      <HeaderContainer>
        <S.DevMenuButton icon={<Menu size="$1" />} onPress={openModal} />
        <S.RestLayout />
      </HeaderContainer>

      <BottomModal ref={modalRef}>
        <DevContainer />
      </BottomModal>
    </>
  );
};
