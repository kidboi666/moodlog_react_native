import { Stack, useTheme } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';
import { Slot } from 'expo-router';
import { CustomTabBar } from '@/components/CustomTabBar';
import { BottomModal } from '@/components/modals/BottomModal';
import { DevContainer } from '@/components/layouts/containers/DevContainer';

export default function TabsLayout() {
  const theme = useTheme();
  const backgroundColor = theme.background.val;

  // RGB 색상값 추출 (16진수 -> RGB)
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

  // 배경색 RGB값
  const bgRgb = hexToRgb(backgroundColor);

  // 투명한 배경색 생성 (동일 RGB, 알파값만 0)
  const transparentBg = `rgba(${bgRgb}, 0)`;

  return (
    <>
      <Stack bg="$background" flex={1} position="relative">
        <Slot
          screenOptions={{
            animation: 'fade',
          }}
        />
        <LinearGradient
          position="absolute"
          t={0}
          l={0}
          r={0}
          height={80}
          z={100}
          colors={[
            '$background',
            `rgba(${bgRgb}, 0.9)`, // 중간 포인트 1: 90% 불투명
            `rgba(${bgRgb}, 0.7)`, // 중간 포인트 2: 70% 불투명
            `rgba(${bgRgb}, 0.3)`, // 중간 포인트 3: 30% 불투명
            transparentBg, // 끝: 완전 투명 배경색
          ]}
          start={[0, 0]}
          end={[0, 1]}
        />
        <CustomTabBar />
      </Stack>
      <BottomModal>
        <DevContainer />
      </BottomModal>
    </>
  );
}
