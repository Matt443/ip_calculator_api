import { givenDataAll } from '@/types/api.types.js';
import { IpAddressInfoType, IpFormatType, subnetSettingType } from '@/types/ip.types.js';
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

/**
 *
 * @param {givenDataAll} query
 */
export function getIpAndMask(query: givenDataAll): {
    ip: string;
    type: IpFormatType;
    mask: string;
    maskType: IpFormatType;
} {
    const type = getQueryParam(query as unknown as givenDataAll, 'type', 'default') as IpFormatType;
    const ip = getQueryParam(query as unknown as givenDataAll, 'ip') as string;
    const mask = getQueryParam(query as unknown as givenDataAll, 'mask') as string;
    const maskType = getQueryParam(
        query as unknown as givenDataAll,
        'maskType',
        'shorthand'
    ) as IpFormatType;
    return { type, ip, mask, maskType };
}

export function getSubnetSetup(query: givenDataAll): subnetSettingType {
    const subnetsQuantity = getQueryParam(query, 'subnetsQuantity') as string;
    const subnetsHostQuantity = getQueryParam(query, 'subnetsHostQuantity') as string;

    return {
        subnetsQuantity: subnetsQuantity ? Number(subnetsQuantity) : undefined,
        subnetsHostQuantity: subnetsHostQuantity ? Number(subnetsHostQuantity) : undefined
    };
}
