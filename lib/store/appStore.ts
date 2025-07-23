import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { combine, createJSONStorage, persist } from 'zustand/middleware';

import { Timezone } from './timezoneStore';

export type AppStoreValues = {
  selectedTimezoneIds: Timezone['id'][];
  settings: {
    militaryTime: boolean | undefined;
  };
};

export type AppStoreMethods = {
  toggleSelectTimezone: (timezoneId: Timezone['id']) => void;
  clearSelectedTimezones: () => void;
};

// Sources on how to use zustand with expo router and splash screen:
// https://www.reddit.com/r/expo/comments/1ehq4bv/expo_router_and_splashscreen_the_right_way/
// https://preview.redd.it/expo-router-and-splashscreen-the-right-way-v0-vly6hegf54gd1.png?width=1922&format=png&auto=webp&s=52bb9aa92e4c9dbde91f7ca20bbe75c8ee6e905e

export type AppStore = AppStoreValues & AppStoreMethods;

export const useAppStore = create(
  persist(
    combine<AppStoreValues, AppStoreMethods>(
      {
        selectedTimezoneIds: [],
        settings: {
          militaryTime: undefined,
        },
      },
      (set) => ({
        toggleSelectTimezone: (timezoneId: Timezone['id']) => {
          set((state) => ({
            selectedTimezoneIds: state.selectedTimezoneIds.includes(timezoneId)
              ? state.selectedTimezoneIds.filter((id) => id !== timezoneId)
              : [...state.selectedTimezoneIds, timezoneId],
          }));
        },
        clearSelectedTimezones: () => {
          set({ selectedTimezoneIds: [] });
        },
      })
    ),
    {
      name: 'app-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ selectedTimezoneIds, settings }) => ({
        selectedTimezoneIds,
        settings,
      }),
    }
  )
);
