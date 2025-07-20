import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useIsHydrated } from '@/hooks/useIsHydrated';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const isHydrated = useIsHydrated();

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (!!loaded && !!isHydrated) {
        // Slightly delaying splash screen hiding for better UX (preventing flicker)
        setTimeout(SplashScreen.hideAsync, 500);
      }
    };

    hideSplashScreen();
  }, [loaded, isHydrated]);

  if (!loaded || !isHydrated) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name={'index'} options={{ headerShown: false }} />
        <Stack.Screen
          name={'addTimezone'}
          options={{ presentation: 'modal', headerShown: false }}
        />

        <Stack.Screen name={'+not-found'} />
      </Stack>
      <StatusBar style={'auto'} />
    </ThemeProvider>
  );
}
