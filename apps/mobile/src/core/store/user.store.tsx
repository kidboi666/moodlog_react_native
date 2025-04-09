import { useEffect } from 'react';

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
  draftEmail: '',
  draftPassword: '',
  isLoading: false,
  error: null,

  registerUser: async (userName, email, password) => {
    try {
      set({ isLoading: true, error: null });
      const updatedUserInfo = {
        ...get().userInfo,
        userName,
        email,
      };
      const newUser = await UserService.saveNewUser(
        updatedUserInfo,
        userName,
        password,
      );
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

  onDraftEmailChange: email => {
    set({ draftEmail: email });
  },

  onDraftPasswordChange: password => {
    set({ draftPassword: password });
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

export function useInitializeUser() {
  const loadUserData = useUser(state => state.loadUserData);
  const updateDaysSinceSignup = useUser(state => state.updateDaysSinceSignup);
  const firstLaunchDate = useApp(state => state.firstLaunchDate);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  useEffect(() => {
    if (firstLaunchDate) {
      updateDaysSinceSignup();
    }
  }, [firstLaunchDate, updateDaysSinceSignup]);
}
