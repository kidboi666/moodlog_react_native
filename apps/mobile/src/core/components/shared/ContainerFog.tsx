import { memo } from 'react';

import { usePathname, useRouter } from 'expo-router';

import { useTheme } from 'tamagui';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HIDE_TAB_BAR_ROUTES } from '@/core/constants/routes';

import * as S from './ContainerFog.styled';

export const ContainerFog = memo(() => {
  const theme = useTheme();
  const backgroundColor = theme.background.val;
  const pathname = usePathname();

  const shouldHideTabBar = HIDE_TAB_BAR_ROUTES.some(route =>
    pathname.startsWith(route),
  );
  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const formattedHex = hex.replace(
      shorthandRegex,
      (_, r, g, b) => r + r + g + g + b + b,
    );
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      formattedHex,
    );

    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '255, 255, 255'; // 기본값
  };

  const bgRgb = hexToRgb(backgroundColor);

  const transparentBg = `rgba(${bgRgb}, 0)`;

  return (
    <>
      <S.TopFog
        colors={[
          '$background',
          `rgba(${bgRgb}, 0.9)`,
          `rgba(${bgRgb}, 0.7)`,
          `rgba(${bgRgb}, 0.3)`,
          transparentBg,
        ]}
      />
      {!shouldHideTabBar && (
        <S.BottomFog
          colors={[
            transparentBg,
            `rgba(${bgRgb}, 0.3)`,
            `rgba(${bgRgb}, 0.7)`,
            `rgba(${bgRgb}, 0.9)`,
            '$background',
          ]}
        />
      )}
    </>
  );
});
