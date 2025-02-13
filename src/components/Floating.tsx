import { AnimatePresence, Button, View } from 'tamagui';
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
          animation="medium"
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
          pressStyle={{
            scale: 0.95,
          }}
        >
          {(draft.content || draft.emotion?.type) && (
            <View
              position="absolute"
              l="$2.5"
              t="$2.5"
              z="$3"
              rounded={'$4'}
              bg="$green11"
              width={12}
              height={12}
            />
          )}
          <Button
            icon={Plus}
            animation="medium"
            fontSize="$2"
            size="$6"
            themeInverse
            onPress={() => router.push('/(modal)/write')}
          >
            New Journal
          </Button>
        </View>
      )}
    </AnimatePresence>
  );
};
