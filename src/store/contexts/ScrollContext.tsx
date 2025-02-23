import { ScrollStore } from '@/types/store';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { Nullable } from '@/types/utils';
import { useNavigation } from 'expo-router';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export const ScrollContext = createContext<Nullable<ScrollStore>>(null);

export const ScrollContextProvider = ({ children }: PropsWithChildren) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigation = useNavigation();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentPosition = event.nativeEvent.contentOffset.y;
    setScrollPosition(currentPosition);
  };

  const resetScroll = () => {
    setScrollPosition(0);
  };

  useEffect(() => {
    return navigation.addListener('state', e => resetScroll());
  }, [navigation]);

  return (
    <ScrollContext.Provider
      value={{ scrollPosition, onScroll: handleScroll, resetScroll }}
    >
      {children}
    </ScrollContext.Provider>
  );
};
