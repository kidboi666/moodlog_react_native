import { Menu } from '@tamagui/lucide-icons';
import { HeaderContainer } from '@/components/layouts/containers/HeaderContainer';
import { useBottomModal } from '@/hooks/useBottomModal';
import { BottomModal } from '@/components/modals/BottomModal';
import { DevContainer } from '@/components/layouts/containers/DevContainer';
import * as S from './HomeHeader.styled';
import { memo } from 'react';

export const HomeHeader = memo(() => {
  const { modalRef, openModal } = useBottomModal();
  return (
    <>
      <HeaderContainer>
        <S.DevMenuButton icon={Menu} onPress={openModal} />
        <S.RestBox />
      </HeaderContainer>

      <BottomModal ref={modalRef}>
        <DevContainer />
      </BottomModal>
    </>
  );
});
