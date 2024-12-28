import http from "./http-common";
import { User } from "./features/auth/authSlice";
import { Media } from "./features/media/mediaSlice";

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

export function isInternalUrl(url: string, baseUrl?: string) {
    return url.startsWith(baseUrl ?? location.origin)
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

export function replaceTemplate(template: string, data: { [key: string]: any }) {
    return template.replace(
        /{(\w*)}/g,
        function (m, key) {
            return data.hasOwnProperty(key) ? data[key] : "";
        }
    );
}

export function objectToQueryString(obj: { [key: string]: string | number | null | undefined }) {
    const keys = Object.keys(obj).filter(key => obj[key] !== undefined);

    const keyValuePairs = keys.map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key] || '');
    });

    return keyValuePairs.join('&');
}

export async function downloadFile(url: string, filename: string) {
    const response = await http.get(url, {
        responseType: 'blob', // Ensures the response is handled as a file
    });

    // Create a URL for the file
    const blob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = blob;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    // Clean up
    link.parentNode?.removeChild(link);
}
