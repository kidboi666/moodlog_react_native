import { useRouter } from 'expo-router';

import * as S from 'src/core/components/features/settings/SettingHeader.styled';
import { ArrowLeft } from '@tamagui/lucide-icons';

import { HeaderContainer } from '@/core/components/shared/HeaderContainer.styleable';

export const SettingHeader = () => {
  const router = useRouter();

  return (
    <HeaderContainer edges={['top', 'bottom']}>
      <S.BackButton icon={ArrowLeft} onPress={() => router.back()} />
      <S.RestBox />
    </HeaderContainer>
  );
};
