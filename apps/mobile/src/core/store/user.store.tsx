import { uuid } from 'expo-modules-core';

import { create } from 'zustand';

import { UserService } from '@/core/services/user.service';

import { UserStore } from '@/types/user.types';

import { useApp } from './app.store';

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
      const newUserInfo = {
        ...get().userInfo,
        userName,
        id: uuid.v4(),
      };
      const newUser = await UserService.saveNewUser(newUserInfo);
      set({ userInfo: newUser });

      await useApp.getState().initFirstLaunchStatus();
    } catch (err) {
      console.error('failed to save user data : ', err);
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },

  onDraftUserNameChange: userName => {
    set({ draftUserName: userName });
  },

  updateDaysSinceSignup: async () => {
    try {
      const firstLaunchDate = useApp.getState().firstLaunchDate;
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
        await useApp.getState().initFirstLaunchStatus();
      }
    } catch (err) {
      console.error('failed to load user data', err);
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },
}));
