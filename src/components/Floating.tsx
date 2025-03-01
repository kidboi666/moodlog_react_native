import { AnimatePresence, Button, Circle, View } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import React from 'react';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ENTER_STYLE, ENTER_STYLE_KEY, PRESS_STYLE } from '@/constants/styles';
import { useDraft } from '@/store/hooks/useDraft';

export const Floating = () => {
  const { draft } = useDraft();
  const router = useRouter();
  const pathname = usePathname();
  const isWritePage = pathname.startsWith('/write');
  const insets = useSafeAreaInsets();

  if (isWritePage) return null;

  return (
    <AnimatePresence>
      <View position="absolute" b={insets.bottom} r="$4">
        <Button
          unstyled
          animation="quick"
          animateOnly={ENTER_STYLE_KEY}
          fontSize="$2"
          size="$6"
          justify="center"
          bg="$gray1"
          themeInverse
          icon={Plus}
          onPress={() => router.push('/write')}
          enterStyle={ENTER_STYLE}
          pressStyle={PRESS_STYLE}
        >
          {(draft.content || draft.emotion?.type) && (
            <Circle
              position="absolute"
              l="$2.5"
              t="$2.5"
              rounded="$4"
              bg="$green9"
              size="$0.75"
            />
          )}
        </Button>
      </View>
    </AnimatePresence>
  );
};
