import * as SplashScreen from 'expo-splash-screen'

import { App } from './src/app/app'

SplashScreen.preventAutoHideAsync()

const NomaDigApp = () => <App hideSplashScreen={SplashScreen.hideAsync} />

export default NomaDigApp
