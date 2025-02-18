import { AnimatePresence, Button, Circle, View } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import React from 'react';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useJournal } from '@/store/hooks/useJournal';
import { ENTER_STYLE } from '@/constants/styles';

export const Floating = () => {
  const { draft } = useJournal();
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
          icon={Plus}
          animation="quick"
          fontSize="$2"
          size="$6"
          justify="center"
          bg="$gray1"
          themeInverse
          onPress={() => router.push('/(modal)/write')}
          enterStyle={ENTER_STYLE}
          pressStyle={{
            scale: 0.9,
          }}
        >
          {(draft.content || draft.emotion?.type) && (
            <Circle
              position="absolute"
              l="$2.5"
              t="$2.5"
              rounded="$4"
              bg="$green11"
              size="$0.75"
            />
          )}
        </Button>
      </View>
    </AnimatePresence>
  );
};
