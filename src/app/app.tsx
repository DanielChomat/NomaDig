import {TamaguiProvider, Theme, ThemeName} from "tamagui";

import {useFonts} from "expo-font";
import {customFontsToLoad} from "../theme/typography";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createStaticNavigation, StaticParamList} from "@react-navigation/native";
import {useEffect} from "react";
import {useIsOnboarded} from "../features/onboarding/hooks/useIsOnboarded";
import {IntroductionScreen} from "../features/onboarding/screens/IntroductionScreen";
import {ExplanationScreen} from "../features/onboarding/screens/ExplanationScreen";
import {config} from "../../tamagui.config";
import {initialWindowMetrics, SafeAreaProvider} from "react-native-safe-area-context";
import {useAppColorScheme} from "../hooks/useAppColorScheme";
import {DefaultScreen} from "../features/dashboard/DefaultScreen";
import {TabsNavigator} from "./navigators/TabsNavigator";


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
            }
        },
        App: {
            if: useIsOnboarded,
            screenOptions: {
                headerShown: false,
            },
            screens: {
                DashboardTabs: TabsNavigator,
            }
        }
    },
    screens: {
        Help: DefaultScreen,
    },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {
        }
    }
}

const Navigation = createStaticNavigation(RootStack);

export const App = ({hideSplashScreen}: NomaDigAppProps) => {
    const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)

    const colorScheme = useAppColorScheme();
    const theme: ThemeName = `${colorScheme}_purple`;


    useEffect(() => {
        if (areFontsLoaded && !fontLoadError) {
            hideSplashScreen()
        }
    }, [areFontsLoaded]);

    if (!areFontsLoaded && !fontLoadError) {
        return null
    }

    return (
        <TamaguiProvider config={config} defaultTheme={"dark_purple"}>
            <Theme name={theme}>
                <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                    <Navigation/>
                </SafeAreaProvider>
            </Theme>
        </TamaguiProvider>
    )
}