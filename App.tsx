import {App} from "./src/app/app";
import * as SplashScreen from "expo-splash-screen"

SplashScreen.preventAutoHideAsync()

const NomaDigApp = () => <App hideSplashScreen={SplashScreen.hideAsync}/>

export default NomaDigApp

