import {
  createStyledContext,
  SizeTokens,
  styled,
  Text,
  View,
} from '@tamagui/web';
import { getSpace } from '@tamagui/get-token';
import { Platform } from 'react-native';

export const ButtonContext = createStyledContext({
  size: '$md' as SizeTokens,
});

export const ButtonFrame = styled(View, {
  name: 'Button',
  context: ButtonContext,
  bg: '$buttonBackground',
  items: 'center',
  animation: 'quick',
  flexDirection: 'row',

  pressStyle: { scale: 0.95, opacity: 0.9 },

  variants: {
    outlined: {
      true: {
        bg: 'transparent',
        color: '$text',
      },
    },
    size: {
      '...size': (name, { tokens }) => {
        return {
          height: tokens.size[name],
          borderRadius: tokens.radius[name],
          // note the getSpace and getSize helpers will let you shift down/up token sizes
          // whereas with gap we just multiply by 0.2
          // this is a stylistic choice, and depends on your design system values
          gap: tokens.space[name].val * 0.2,
          paddingHorizontal: getSpace(name, {
            shift: -1,
          }),
        };
      },
    },
  } as const,

  defaultVariants: {
    size: '$md',
  },
});

export const ButtonText = styled(Text, {
  name: 'ButtonText',
  context: ButtonContext,
  fontFamily: '$body',
  color: '$buttonText',
  ...(Platform.OS === 'web'
    ? {
        userSelect: 'none',
      }
    : {}),

  variants: {
    size: {
      '...fontSize': (name, { font }) => ({
        fontSize: font?.size[name],
      }),
    },
  } as const,
});
