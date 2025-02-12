import { AnimatePresence, Button } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import React from 'react';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Floating = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isWritePage = pathname.startsWith('/write');
  const insets = useSafeAreaInsets();
  return (
    <AnimatePresence>
      {!isWritePage && (
        <Button
          icon={Plus}
          animation="medium"
          position="absolute"
          b={insets.bottom}
          r="$4"
          fontSize="$2"
          size="$5"
          themeInverse
          onPress={() => router.push('/(modal)/write')}
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
          New Journal
        </Button>
      )}
    </AnimatePresence>
  );
};
