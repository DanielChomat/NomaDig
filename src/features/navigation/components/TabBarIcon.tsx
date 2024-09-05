import type {FunctionComponent} from "react";
import {useGetThemedIcon} from "@tamagui/helpers-tamagui";
import {getFontSize} from "@tamagui/font-size";
import type {FontSizeTokens} from "@tamagui/web";
import {getTokens} from "tamagui";

type Props = { icon: FunctionComponent<{ color?: string; size?: number }>; focused: boolean }

export const TabBarIcon = ({icon, focused}: Props): JSX.Element => {
    const color = focused ? getTokens().color.green9Dark : getTokens().color.red9Dark
    const getThemedIcon = useGetThemedIcon({
        size: getFontSize("$9" as FontSizeTokens),
        color
    })

    return getThemedIcon(icon)
}