import { Button, ViewProps } from 'tamagui';
import React from 'react';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import { HeaderContainer } from '@/components/layouts/containers/HeaderContainer';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';

export const WriteHeader = ({ ...props }: ViewProps) => {
  return (
    <HeaderContainer {...props}>
      <Button
        unstyled
        p="$3"
        rounded="$4"
        icon={<ArrowLeft size="$1" />}
        onPress={() => router.back()}
        animation="medium"
        animateOnly={PRESS_STYLE_KEY}
        pressStyle={PRESS_STYLE}
      />
    </HeaderContainer>
  );
};
