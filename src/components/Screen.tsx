import {useScrollToTop} from "@react-navigation/native"
import {StatusBar, StatusBarProps} from "expo-status-bar"
import React, {useRef, useState} from "react"
import {
    KeyboardAvoidingView,
    KeyboardAvoidingViewProps,
    LayoutChangeEvent,
    Platform,
    ScrollViewProps,
    StyleProp,
    ViewStyle,
} from "react-native"
import {ExtendedEdge, useSafeAreaInsetsStyle} from "../hooks/useSafeAreaInsetsStyle";
import {ScrollView, styled, useTheme, YStack} from "tamagui";

interface BaseScreenProps {
    /**
     * Children components.
     */
    children?: React.ReactNode
    /**
     * Style for the outer content container useful for padding & margin.
     */
    style?: StyleProp<ViewStyle>
    /**
     * Style for the inner content container useful for padding & margin.
     */
    contentContainerStyle?: StyleProp<ViewStyle>
    /**
     * Override the default edges for the safe area.
     */
    safeAreaEdges?: ExtendedEdge[]
    /**
     * Background color
     */
    // backgroundColor?: string
    /**
     * Status bar setting. Defaults to dark.
     */
    statusBarStyle?: "light" | "dark"
    /**
     * By how much should we offset the keyboard? Defaults to 0.
     */
    keyboardOffset?: number
    /**
     * Pass any additional props directly to the StatusBar component.
     */
    StatusBarProps?: StatusBarProps
    /**
     * Pass any additional props directly to the KeyboardAvoidingView component.
     */
    KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps
}

interface FixedScreenProps extends BaseScreenProps {
    preset?: "fixed"
}

interface ScrollScreenProps extends BaseScreenProps {
    preset?: "scroll"
    /**
     * Should keyboard persist on screen tap. Defaults to handled.
     * Only applies to scroll preset.
     */
    keyboardShouldPersistTaps?: "handled" | "always" | "never"
    /**
     * Pass any additional props directly to the ScrollView component.
     */
    ScrollViewProps?: ScrollViewProps
}

interface AutoScreenProps extends Omit<ScrollScreenProps, "preset"> {
    preset?: "auto"
    /**
     * Threshold to trigger the automatic disabling/enabling of scroll ability.
     * Defaults to `{ percent: 0.92 }`.
     */
    scrollEnabledToggleThreshold?: { percent?: number; point?: number }
}

export type ScreenProps = ScrollScreenProps | FixedScreenProps | AutoScreenProps

const isIos = Platform.OS === "ios"

type ScreenPreset = "fixed" | "scroll" | "auto"

/**
 * @param {ScreenPreset?} preset - The preset to check.
 * @returns {boolean} - Whether the preset is non-scrolling.
 */
function isNonScrolling(preset?: ScreenPreset) {
    return !preset || preset === "fixed"
}

/**
 * Custom hook that handles the automatic enabling/disabling of scroll ability based on the content size and screen size.
 * @param {UseAutoPresetProps} props - The props for the `useAutoPreset` hook.
 * @returns {{boolean, Function, Function}} - The scroll state, and the `onContentSizeChange` and `onLayout` functions.
 */
function useAutoPreset(props: AutoScreenProps): {
    scrollEnabled: boolean
    onContentSizeChange: (w: number, h: number) => void
    onLayout: (e: LayoutChangeEvent) => void
} {
    const {preset, scrollEnabledToggleThreshold} = props
    const {percent = 0.92, point = 0} = scrollEnabledToggleThreshold || {}

    const scrollViewHeight = useRef<null | number>(null)
    const scrollViewContentHeight = useRef<null | number>(null)
    const [scrollEnabled, setScrollEnabled] = useState(true)

    function updateScrollState() {
        if (scrollViewHeight.current === null || scrollViewContentHeight.current === null) return

        // check whether content fits the screen then toggle scroll state according to it
        const contentFitsScreen = (function () {
            if (point) {
                return scrollViewContentHeight.current < scrollViewHeight.current - point
            } else {
                return scrollViewContentHeight.current < scrollViewHeight.current * percent
            }
        })()

        // content is less than the size of the screen, so we can disable scrolling
        if (scrollEnabled && contentFitsScreen) setScrollEnabled(false)

        // content is greater than the size of the screen, so let's enable scrolling
        if (!scrollEnabled && !contentFitsScreen) setScrollEnabled(true)
    }

    /**
     * @param {number} w - The width of the content.
     * @param {number} h - The height of the content.
     */
    function onContentSizeChange(w: number, h: number) {
        // update scroll-view content height
        scrollViewContentHeight.current = h
        updateScrollState()
    }

    /**
     * @param {LayoutChangeEvent} e = The layout change event.
     */
    function onLayout(e: LayoutChangeEvent) {
        const {height} = e.nativeEvent.layout
        // update scroll-view  height
        scrollViewHeight.current = height
        updateScrollState()
    }

    // update scroll state on every render
    if (preset === "auto") updateScrollState()

    return {
        scrollEnabled: preset === "auto" ? scrollEnabled : true,
        onContentSizeChange,
        onLayout,
    }
}

const ScreenWithoutScrolling = (props: ScreenProps) => {
    const {style, contentContainerStyle, children} = props

    const OuterStyledView = styled(YStack, {
        // Your styles here
        flex: 1,
        width: '100%',
        height: '100%',
        // style
    });

    const InnerStyledView = styled(YStack, {
        // Your styles here

        justifyContent: "flex-start",
        alignItems: "stretch",
        // style: contentContainerStyle
    });

    return (
        <OuterStyledView>
            <InnerStyledView>{children}</InnerStyledView>
        </OuterStyledView>
    )
}

const ScreenWithScrolling = (props: ScreenProps) => {
    const {
        children,
        keyboardShouldPersistTaps = "handled",
        contentContainerStyle,
        ScrollViewProps,
        style,
    } = props as ScrollScreenProps

    const {
        onLayout: scrollPropOnLayout,
        onContentSizeChange: scrollPropOnContentSizeChange,
        contentContainerStyle: scrollPropContentContainerStyle
    } = ScrollViewProps ?? {}

    const ref = useRef<ScrollView>(null)

    const {scrollEnabled, onContentSizeChange, onLayout} = useAutoPreset(props as AutoScreenProps)

    // Add native behavior of pressing the active tab to scroll to the top of the content
    // More info at: https://reactnavigation.org/docs/use-scroll-to-top/
    useScrollToTop(ref)

    return (
        <ScrollView
            {...{keyboardShouldPersistTaps, scrollEnabled, ref}}
            {...ScrollViewProps}
            onLayout={(e) => {
                onLayout(e)
                scrollPropOnLayout?.(e)
            }}
            onContentSizeChange={(w: number, h: number) => {
                onContentSizeChange(w, h)
                scrollPropOnContentSizeChange?.(w, h)
            }}
            style={[$outerStyle, ScrollViewProps?.style, style]}
            contentContainerStyle={{
                justifyContent: "flex-start",
                alignItems: "stretch",
                ...(!!scrollPropContentContainerStyle ? {scrollPropContentContainerStyle} : {}),
                contentContainerStyle,
            }}
        >
            {children}
        </ScrollView>
    )
}

export const Screen = (props: ScreenProps) => {
    const {
        KeyboardAvoidingViewProps,
        keyboardOffset = 0,
        safeAreaEdges = ['top', 'bottom'],
        StatusBarProps,
        statusBarStyle = "dark",
    } = props

    const theme = useTheme();

    const backgroundColor = theme.background.get()

    const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)

    return (
        <YStack flex={1} w={"100%"} h={'100%'} backgroundColor={backgroundColor} {...$containerInsets}>
            <StatusBar style={statusBarStyle} {...StatusBarProps} />

            <KeyboardAvoidingView
                behavior={isIos ? "padding" : "height"}
                keyboardVerticalOffset={keyboardOffset}
                {...KeyboardAvoidingViewProps}
                style={[$keyboardAvoidingViewStyle, KeyboardAvoidingViewProps?.style]}
            >
                {isNonScrolling(props.preset) ? (
                    <ScreenWithoutScrolling {...props} />
                ) : (
                    <ScreenWithScrolling {...props} />
                )}
            </KeyboardAvoidingView>
        </YStack>
    )
}

const $keyboardAvoidingViewStyle: ViewStyle = {
    flex: 1,
}

const $outerStyle: ViewStyle = {
    flex: 1,
    height: "100%",
    width: "100%",
}
