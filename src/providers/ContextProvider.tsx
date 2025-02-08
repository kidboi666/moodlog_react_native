import DiaryContextProvider from '@/store/useDiary';
import { PropsWithChildren } from 'react';

export const ContextProvider = ({ children }: PropsWithChildren) => {
  return <DiaryContextProvider>{children}</DiaryContextProvider>;
};
