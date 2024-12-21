import { User } from "./features/auth/authSlice";
import { Media } from "./features/media/mediaSlice";

export const apiBaseUrl = (process.env.VITE_APP_API_URL || location.origin + '/api/v1');

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
export function queryStringToObject(queryString: string) {
    if (!queryString) {
        return {};
    }

    const query: { [key: string]: string } = {};
    const pairs = (queryString[0] === '?' ? queryString.substring(1) : queryString).split('&');

    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

export function isInternalUrl(url: string) {
    return url.startsWith(apiBaseUrl)
        || url.startsWith("/")
        || !url.startsWith("http://")
        || !url.startsWith("https://");
}

export function hasPermission(user: User, permission: string) {
    if (user.has_all_permissions) {
        return true;
    }

    return user.permissions.includes(permission);
}

export function hasRole(user: User, role: string) {
    if (user.has_all_permissions) {
        return true;
    }

    return user.roles.includes(role);
}

export function hasAllPermissions(user: User) {
    return user.has_all_permissions;
}

export function hasAnyPermission(user: User, permissions: string[]) {
    if (user.has_all_permissions) {
        return true;
    }

    if (permissions.length === 0) {
        return false;
    }

    if (!user.permissions || user.permissions?.length === 0) {
        return false;
    }

    return permissions.some(permission => user.permissions.includes(permission));
}

export function adminUrl(path: string = '') {
    return `/admin-cp/${path}`;
}

export function parseIdByName(name: string) {
    return name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}

export function mediaImageSrcs(media: Media, defaultSrcConversion: null|string = null) {
    let src = defaultSrcConversion ? (media.conversions[defaultSrcConversion] ?? media.url) : media.url;

    if (!media.conversions || !media.conversions.srcset) {
        return {
            src: src,
        };
    }

    return {
        src: src,
        srcSet: media.conversions.srcset,
    };
}
