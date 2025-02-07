import { useTheme, withStaticProperties } from '@tamagui/web';
import { cloneElement, ReactNode, useContext } from 'react';
import { getTokens } from 'tamagui';
import * as S from './Button.styled';

const ButtonIcon = (props: { children: ReactNode }) => {
  const { size } = useContext(S.ButtonContext);
  const tokens = getTokens();
  const smallerSize = tokens.size[size].val * 0.5;
  const theme = useTheme();
  return cloneElement(props.children as any, {
    width: smallerSize,
    height: smallerSize,
    color: theme.buttonText.get(),
  });
};

export const Button = withStaticProperties(S.ButtonFrame, {
  Props: S.ButtonContext.Provider,
  Text: S.ButtonText,
  Icon: ButtonIcon,
});
