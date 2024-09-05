import {XStack} from "tamagui";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {DashboardTabBarItem} from "./DashboardTabBarItem";

export const DashboardTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
    const {bottom} = useSafeAreaInsets()

    const items = state.routes.map((route, index) => {
            const focused = state.index === index;

            return (
                <DashboardTabBarItem
                    key={route.key}
                    route={route}
                    descriptors={descriptors}
                    focused={focused}
                    navigation={navigation}
                />
            )
        }
    )

    return (
        <XStack
            backgroundColor={"lightblue"}
            position={"absolute"}
            bottom={bottom}
            left={24}
            right={24}
            borderRadius={100}
            borderWidth={2}
            borderColor={'black'}
            height={64}
            paddingVertical={8}
            paddingHorizontal={8}
            justifyContent={"space-between"}
            gap={4}>
            {items}
        </XStack>
    );

}