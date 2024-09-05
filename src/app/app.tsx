import { useEffect } from 'react'
import { TamaguiProvider, Theme, ThemeName } from 'tamagui'

import { createStaticNavigation, StaticParamList } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'

import { config } from '../../tamagui.config'
import { DefaultScreen } from '../features/dashboard/DefaultScreen'
import { useIsOnboarded } from '../features/onboarding/hooks/useIsOnboarded'
import { ExplanationScreen } from '../features/onboarding/screens/ExplanationScreen'
import { IntroductionScreen } from '../features/onboarding/screens/IntroductionScreen'
import { useAppColorScheme } from '../hooks/useAppColorScheme'
import { customFontsToLoad } from '../theme/typography'
import { TabsNavigator } from './navigators/TabsNavigator'

type NomaDigAppProps = {
  hideSplashScreen: () => Promise<boolean>
}

const RootStack = createNativeStackNavigator({
  groups: {
    Onboarding: {
      if: () => !useIsOnboarded(),
      screenOptions: {
        headerShown: false,
      },
      screens: {
        Introduction: {
          screen: IntroductionScreen,
        },
        Explanation: ExplanationScreen,
      },
    },
    App: {
      if: useIsOnboarded,
      screenOptions: {
        headerShown: false,
      },
      screens: {
        DashboardTabs: TabsNavigator,
      },
    },
  },
  screens: {
    Help: DefaultScreen,
  },
})

type RootStackParamList = StaticParamList<typeof RootStack>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Navigation = createStaticNavigation(RootStack)

export const App = ({ hideSplashScreen }: NomaDigAppProps) => {
  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)

  const colorScheme = useAppColorScheme()
  const theme: ThemeName = `${colorScheme}_purple`

  useEffect(() => {
    if (areFontsLoaded && !fontLoadError) {
      hideSplashScreen()
    }
  }, [areFontsLoaded])

  if (!areFontsLoaded && !fontLoadError) {
    return null
  }

  return (
    <TamaguiProvider config={config} defaultTheme={'dark_purple'}>
      <Theme name={theme}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <Navigation />
        </SafeAreaProvider>
      </Theme>
    </TamaguiProvider>
  )
}
