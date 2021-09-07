
/**
 * This function returns the locale
 *  1. Will return a locale if passed in
 *  2. If no locale, it will try to detect one
 *  3. if not found, it will return en-US
 * @param locale {string|null}
 */

export function getLocale(locale = null) {

    if(locale){
        return locale
    }

    let nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i,
        language,
        len,
        shortLanguage = null;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            len = language.length;
            if (!shortLanguage && len) {
                shortLanguage = language;
            }
            if (language && len>2) {
                return language;
            }
        }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        //skip this loop iteration if property is null/undefined.  IE11 fix.
        if (language == null) { continue; }
        len = language.length;
        if (!shortLanguage && len) {
            shortLanguage = language;
        }
        if (language && len > 2) {
            return language;
        }
    }

    if(shortLanguage){
        return shortLanguage
    }

    return 'en-US'
}

/**
 * This function returns the language
 *  1. Will return a language if passed in
 *  2. If no language, it will try to detect one from the local
 *  3. if not found, it will return en
 * @param [lang] {string|null}
 * @param [locale] {string|null}
 */

export function getLanguage(lang = null, locale = null) {

    if(lang){
        return lang
    }

    if(!locale){
        locale = getLocale(locale)
    }

    return locale.slice(0,2)
}

/**
 * This function returns a number it in the users local format
 * @param price {number}
 * @param currency {string} ISO currency code (defaults to USD if not passed)
 * @param [locale] {string|null} e.g. en-US will attempt to detect if not found or revert to en-US
 * @returns {string} e.g. US: $73.57  | DE 73,57 €
 */

export function getCurrency(price, currency = 'USD', locale = null) {

    if(!locale){
        locale = getLocale(locale)
    }

    return new Intl.NumberFormat(locale,{style:'currency',currency:currency, currencyDisplay: 'narrowSymbol'}).format(price);
}

/**
 * This function returns a number it in the users local format
 * @param [locale] {string|null} e.g. en-US will attempt to detect if not found or revert to en-US
 * @returns {string} e.g. US: $73.57  | DE 73,57 €
 */

export function getCountry(locale = null) {

    if (!locale) {
        locale = getLocale(locale)
    }

    return locale.slice(3, 5)
}
