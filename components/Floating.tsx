import { AnimatePresence, Button, Circle, View } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import React from 'react';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useJournalContext } from '@/store/hooks/useJournalContext';

export const Floating = () => {
  const { draft } = useJournalContext();
  const router = useRouter();
  const pathname = usePathname();
  const isWritePage = pathname.startsWith('/write');
  const insets = useSafeAreaInsets();

  return (
    <AnimatePresence>
      {!isWritePage && (
        <View
          position="absolute"
          b={insets.bottom}
          r="$4"
          enterStyle={{
            scale: 0,
            opacity: 0,
          }}
          exitStyle={{
            scale: 0,
            opacity: 0,
          }}
        >
          <Button
            icon={Plus}
            animation="quick"
            fontSize="$2"
            size="$6"
            themeInverse
            onPress={() => router.push('/(modal)/write')}
            pressStyle={{
              scale: 0.9,
            }}
          >
            New Journal
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
      )}
    </AnimatePresence>
  );
};
