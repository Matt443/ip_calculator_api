import { givenDataAll } from '@/types/api.types.js';
import { IpAddressInfoType } from '@/types/ip.types.js';
/**
 * Checks if certain param was given
 * @param {givenDataAll} query
 * @param {string} paramName
 * @param {undefined|string} defaultValue - default value when param is nullable
 * @returns {string|false} - returns param value or false if param is not given, if default value is given and param is not given returns default value
 */
export function getQueryParam(
    query: givenDataAll,
    paramName: keyof givenDataAll,
    defaultValue: string | undefined = undefined
): string | false {
    const param = query[paramName] as string;

    if (param == undefined && defaultValue !== undefined) return defaultValue;
    else if (param == undefined && defaultValue == undefined) return false;

    return param;
}

export function createApiResponse(given: { ip: string; mask: string }, result: IpAddressInfoType) {
    return {
        given,
        result
    };
}
