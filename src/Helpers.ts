
/**
 * Returns the given URL as it is. This is a no-op function that's used as a placeholder.
 *
 * @param {string} url The URL to return.
 * @returns {string} The given URL.
 */
export const uploadUrl = (url: string): string => {
    return url;
}

/**
 * Converts an object to a query string.
 *
 * @param {Object} obj The object to convert to a query string.
 * @returns {string} The query string.
 */
export const objectToQueryString = (obj: { [key: string]: string | number | null | undefined }): string => {
    const keys = Object.keys(obj).filter(key => obj[key] !== undefined);

    const keyValuePairs = keys.map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key] || '');
    });

    if (keyValuePairs.length === 0) {
        return '';
    }

    return keyValuePairs.join('&');
}
