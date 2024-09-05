import {createFont, createMedia, createTamagui} from "tamagui";
import {createAnimations} from '@tamagui/animations-react-native';
import {createGenericFont} from "@tamagui/config/src/createGenericFont";
import {shorthands} from '@tamagui/shorthands';
import {themes, tokens} from '@tamagui/themes';

const notoSansFont = createFont({
    family: 'Noto Sans, Arial, sans-serif',
    weight: {
        100: '100', // Thin
        200: '200', // ExtraLight
        300: '300', // Light
        400: '400', // Regular
        500: '500', // Medium
        600: '600', // SemiBold
        700: '700', // Bold
        800: '800', // ExtraBold
        900: '900', // Black
    },
    size: {
        1: 8,
        2: 10,
        3: 12,
        4: 14,
        5: 16,
        6: 18,
        7: 20,
        8: 22,
        9: 24,
        10: 28,
        11: 30,
    },
    lineHeight: {
        1: 1.2,
        2: 1.5,
        3: 1.8,
    },
    face: {
        100: {normal: 'NotoSansThin'},
        200: {normal: 'NotoSansExtraLight'},
        300: {normal: 'NotoSansLight'},
        400: {normal: 'NotoSansRegular'},
        500: {normal: 'NotoSansMedium'},
        600: {normal: 'NotoSansSemiBold'},
        700: {normal: 'NotoSansBold'},
        800: {normal: 'NotoSansExtraBold'},
        900: {normal: 'NotoSansBlack'},
    },
    defaults: {
        face: 400,
        weight: 400,  // This sets the default font weight for headings
    },
});

const squadaOneFont = createGenericFont('SquadaOne, Impact, sans-serif', {
        weight: {
            1: '400', // Regular
        },
        size: {
            1: 24,
            2: 32,
            3: 40,
            4: 48,
            5: 56,
            6: 64,
            7: 72,
            8: 80,
            9: 88,
            10: 96,
            11: 104,
            12: 56,
            13: 56,
            14: 56,
            15: 56,
            16: 56,
        },
        letterSpacing: {
            1: 0,
            2: -0.5,
            3: -1,
        },
        defaults: {
            weight: 1,  // This sets the default font weight for headings
        },
        face: {
            400: {normal: 'SquadaOne'},
        },
    },
    {sizeLineHeight: (size) => Math.round(size * 1.1 + (size < 30 ? 10 : 5))}
);

const animations = createAnimations({
    bouncy: {
        type: 'spring',
        damping: 10,
        mass: 0.9,
        stiffness: 100,
    },
    lazy: {
        type: 'spring',
        damping: 20,
        stiffness: 60,
    },
    quick: {
        type: 'spring',
        damping: 20,
        mass: 1.2,
        stiffness: 250,
    },
});


export const config = createTamagui({
    settings: {
        defaultFont: 'body',
        shouldAddPrefersColorThemes: true,
        themeClassNameOnRoot: true,
    },
    animations,
    shorthands,
    fonts: {
        body: notoSansFont,
        heading: squadaOneFont,
    },
    themes,
    tokens,
    media: createMedia({
        xs: {maxWidth: 660},
        sm: {maxWidth: 800},
        md: {maxWidth: 1020},
        lg: {maxWidth: 1280},
        xl: {maxWidth: 1420},
        xxl: {maxWidth: 1600},
        gtXs: {minWidth: 660 + 1},
        gtSm: {minWidth: 800 + 1},
        gtMd: {minWidth: 1020 + 1},
        gtLg: {minWidth: 1280 + 1},
        short: {maxHeight: 820},
        tall: {minHeight: 820},
        hoverNone: {hover: 'none'},
        pointerCoarse: {pointer: 'coarse'},
    }),
});

type AppConfig = typeof config;

// Enable auto-completion of props shorthand (ex: jc="center") for Tamagui templates.
// Docs: https://tamagui.dev/docs/core/configuration

declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig {
    }
}