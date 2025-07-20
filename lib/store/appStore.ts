import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Sources on how to use zustand with expo router and splash screen:
// https://www.reddit.com/r/expo/comments/1ehq4bv/expo_router_and_splashscreen_the_right_way/
// https://preview.redd.it/expo-router-and-splashscreen-the-right-way-v0-vly6hegf54gd1.png?width=1922&format=png&auto=webp&s=52bb9aa92e4c9dbde91f7ca20bbe75c8ee6e905e

interface AppStoreValues {
  settings: {
    militaryTime: boolean | undefined;
  };
}

export const useAppStore = create(
  persist<AppStoreValues>(
    () => ({
      settings: {
        militaryTime: undefined,
      },
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ settings }) => ({ settings }),
    }
  )
);
