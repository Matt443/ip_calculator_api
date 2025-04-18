import { AllParamsType } from '@/types/api.types';
import { IpFormatType, subnetSettingType } from '@/types/ip.types.js';
/**
 * Checks if certain param was given
 * @param {AllParamsType} query
 * @param {string} paramName
 * @param {undefined|string} defaultValue - default value when param is nullable
 * @returns {string|false} - returns param value or false if param is not given, if default value is given and param is not given returns default value
 */
export function getQueryParam(
    query: AllParamsType,
    paramName: keyof AllParamsType,
    defaultValue: string | undefined = undefined
): string | false | Array<any> | object {
    const param = query[paramName] as string;

    if (param == undefined && defaultValue !== undefined) return defaultValue;
    else if (param == undefined && defaultValue == undefined) return false;

    return param;
}

/**
 *
 * @param {AllParamsType} query
 */
export function getIpAndMask(query: AllParamsType): {
    ip: string;
    type: IpFormatType;
    mask: string;
    maskType: IpFormatType;
} {
    const type = getQueryParam(
        query as unknown as AllParamsType,
        'type',
        'default'
    ) as IpFormatType;
    const ip = getQueryParam(query as unknown as AllParamsType, 'ip') as string;
    const mask = getQueryParam(query as unknown as AllParamsType, 'mask') as string;
    const maskType = getQueryParam(
        query as unknown as AllParamsType,
        'maskType',
        'shorthand'
    ) as IpFormatType;
    return { type, ip, mask, maskType };
}

/**
 *
 * @param {AllParamsType} query
 * @returns {subnetSettingType}
 */
export function getSubnetSetup(query: AllParamsType): subnetSettingType {
    const subnetsQuantity = getQueryParam(query, 'subnetsQuantity');
    const subnetsHostQuantity = getQueryParam(query, 'subnetsHostQuantity');

    return {
        subnetsQuantity: subnetsQuantity ? Number(subnetsQuantity) : undefined,
        subnetsHostQuantity: subnetsHostQuantity ? Number(subnetsHostQuantity) : undefined
    };
}
