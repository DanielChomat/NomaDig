import * as Localization from "expo-localization"
import {en, Translations} from "./en";
import {I18n} from "i18n-js";
import {fr} from "./fr";
import {es} from "./es";
import {I18nManager} from "react-native";

// Heavily inspired by Ignite's i18n implementation

const fallbackLocale = "en-US"
export const i18n = new I18n(
    {en, "en-US": en, es, fr},
    {locale: fallbackLocale, defaultLocale: fallbackLocale, enableFallback: true},
)

const systemLocale = Localization.getLocales()[0]
const systemLocaleTag = systemLocale?.languageTag ?? fallbackLocale

if (Object.prototype.hasOwnProperty.call(i18n.translations, systemLocaleTag)) {
    // if specific locales like en-FI or en-US is available, set it
    i18n.locale = systemLocaleTag
} else {
    // otherwise try to fallback to the general locale (dropping the -XX suffix)
    const generalLocale = systemLocaleTag.split("-")[0]
    if (Object.prototype.hasOwnProperty.call(i18n.translations, generalLocale)) {
        i18n.locale = generalLocale
    } else {
        i18n.locale = fallbackLocale
    }
}

// handle RTL languages
export const isRTL = systemLocale?.textDirection === "rtl"
I18nManager.allowRTL(isRTL)
I18nManager.forceRTL(isRTL)

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
    [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
    [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
        TObj[TKey],
        `['${TKey}']` | `.${TKey}`
    >
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
    ? Text
    : TValue extends object
        ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
        : Text

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>