import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { createContext, useRef } from 'react';
import { Keyboard } from 'react-native';
import { IBottomModalStore } from 'src/types/store';

export const BottomModalContext = createContext<IBottomModalStore | null>(null);

export const BottomModalContextProvider = ({ children }) => {
  const modalRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    Keyboard.dismiss();
    modalRef.current?.present();
  };

  const closeModal = () => {
    modalRef.current?.dismiss();
  };

  return (
    <BottomModalContext.Provider value={{ modalRef, openModal, closeModal }}>
      {children}
    </BottomModalContext.Provider>
  );
};
