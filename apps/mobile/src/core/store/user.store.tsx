import { useEffect } from 'react';

import { create } from 'zustand';

import { UserService } from '@/core/services/user.service';
import { useAppStore } from '@/core/store/app.store';

import { UserStore } from '@/types/user.types';

const initialUserInfo = {
  id: '',
  userName: '',
  email: null,
  provider: null,
  age: null,
  avatarUrl: null,
  daysSinceSignup: 0,
};

export const useUser = create<UserStore>((set, get) => ({
  userInfo: initialUserInfo,
  draftUserName: '',
  isLoading: false,
  error: null,

  registerUser: async userName => {
    try {
      set({ isLoading: true, error: null });
      const newUser = await UserService.saveNewUser(get().userInfo, userName);
      set({ userInfo: newUser });

      await useAppStore.getState().initFirstLaunchStatus();
    } catch (err) {
      console.error('failed to save user data : ', err);
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },

  onDraftUserNameChange: userName => {
    set(state => ({
      userInfo: { ...state.userInfo, userName },
    }));
  },

  updateDaysSinceSignup: async () => {
    try {
      const firstLaunchDate = useAppStore.getState().firstLaunchDate;
      if (!firstLaunchDate) return;

      const newDaysSinceSignup = await UserService.saveDaysSinceSignup(
        get().userInfo,
        firstLaunchDate,
      );

      set(state => ({
        userInfo: {
          ...state.userInfo,
          daysSinceSignup: newDaysSinceSignup,
        },
      }));
    } catch (err) {
      console.error('failed to save user data : ', err);
      set({ error: err });
    }
  },

  onUserInfoChange: async updatedUserInfo => {
    try {
      set({ isLoading: true, error: null });
      const newUserInfo = await UserService.saveUser(
        get().userInfo,
        updatedUserInfo,
      );
      set({ userInfo: newUserInfo });
    } catch (err) {
      console.error('failed to save user data : ', err);
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },

  loadUserData: async () => {
    try {
      set({ isLoading: true, error: null });
      const savedUserData = await UserService.loadUser();

      if (savedUserData) {
        set({ userInfo: savedUserData });
        await useAppStore.getState().initFirstLaunchStatus();
      }
    } catch (err) {
      console.error('failed to load user data', err);
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export function useInitializeUser() {
  const loadUserData = useUser(state => state.loadUserData);
  const updateDaysSinceSignup = useUser(state => state.updateDaysSinceSignup);
  const firstLaunchDate = useAppStore(state => state.firstLaunchDate);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  useEffect(() => {
    if (firstLaunchDate) {
      updateDaysSinceSignup();
    }
  }, [firstLaunchDate, updateDaysSinceSignup]);
}
