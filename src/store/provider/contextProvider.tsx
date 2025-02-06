import DiaryContextProvider from '@/store/context/useDiary';
import { PropsWithChildren } from 'react';

const ContextProvider = ({ children }: PropsWithChildren) => {
  return <DiaryContextProvider>{children}</DiaryContextProvider>;
};

export default ContextProvider;
