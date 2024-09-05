import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {DefaultScreen} from "../../features/dashboard/DefaultScreen";
import {DashboardTabBar} from "../../features/navigation/DashboardTabBar";
import {translate} from "../../features/i18n/translate";
import {Home, Laptop, Menu, Plane, Wallet} from "@tamagui/lucide-icons";
import {TabBarIcon} from "../../features/navigation/components/TabBarIcon";

export const TabsNavigator = createBottomTabNavigator({
    tabBar: (props) => <DashboardTabBar {...props} />,
    options: {initialRouteName: 'Home'},

    screens: {
        Cowork: {
            screen: DefaultScreen,
            options: {
                tabBarLabel: translate('navigation.dashboardTabBar.cowork'),
                tabBarIcon: ({focused}) => <TabBarIcon icon={Laptop} focused={focused}/>
            },
        },
        Finances: {
            screen: DefaultScreen,
            options: {
                tabBarLabel: translate('navigation.dashboardTabBar.finances'),
                tabBarIcon: ({focused}) => <TabBarIcon icon={Wallet} focused={focused}/>
            },
        },
        Home: {
            screen: DefaultScreen,
            options: {
                tabBarLabel: translate('navigation.dashboardTabBar.home'),
                tabBarIcon: ({focused}) => <TabBarIcon icon={Home} focused={focused}/>
            },
        },
        Travel: {
            screen: DefaultScreen,
            options: {
                tabBarLabel: translate('navigation.dashboardTabBar.travel'),
                tabBarIcon: ({focused}) => <TabBarIcon icon={Plane} focused={focused}/>
            },
        },
        More: {
            screen: DefaultScreen,
            options: {
                tabBarLabel: translate('navigation.dashboardTabBar.menu'),
                tabBarIcon: ({focused}) => <TabBarIcon icon={Menu} focused={focused}/>
            },
        },
    },
});
