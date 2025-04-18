import { ResponseIpConversion } from '@/types/api.types';
import { IpAddresBinaryType, IpAddressType, IpFormatType } from '@/types/ip.types.js';
import { anyIpAddressStrategy } from '@/types/strategy.types.js';
import {
    binaryMergedToDefault,
    binaryMergedToUnmerged,
    concatBinary,
    ipBinaryToDefault,
    ipDecimalToDefault,
    ipDottedToDefault,
    ipToBinary,
    ipToDecimal,
    shorthandToDefault
} from '@/utils/calculating.util.js';
import {
    ipAddressBinaryValidation,
    ipAddressDecimalValidation,
    ipAddressValidation,
    ipShorthandValidation,
    possibleShorthandValidation
} from '@/utils/validation.util.js';

export const anyIp: Record<IpFormatType, anyIpAddressStrategy> = {
    decimal: {
        validate(ip: string): boolean {
            return ipAddressDecimalValidation(Number(ip));
        },
        toBinary(ip: string): IpAddresBinaryType {
            const ipDefault: IpAddressType = ipDecimalToDefault(Number(ip));
            return ipToBinary(ipDefault);
        },
        toDecimal(ip: string): number {
            return Number(ip);
        },
        toDefault(ip: string): IpAddressType {
            return ipDecimalToDefault(Number(ip));
        },
        toShorthand(ip: string): number {
            const ipDefault: IpAddressType = ipDecimalToDefault(Number(ip));
            const ipBinary: string = concatBinary(ipToBinary(ipDefault));

            if (!possibleShorthandValidation(ipBinary)) return -1;

            return ipBinary.split('1').length - 1;
        },
        conversionResponseApi(given: string, ipDecimal: number): ResponseIpConversion {
            return {
                given,
                result: {
                    decimal: ipDecimal
                }
            };
        }
    },
    default: {
        validate(ip: string): boolean {
            const ipExploaded: IpAddressType = ipDottedToDefault(ip);
            return ipAddressValidation(ipExploaded);
        },
        toBinary(ip: string): IpAddresBinaryType {
            const ipDefault: IpAddressType = ipDottedToDefault(ip);
            return ipToBinary(ipDefault);
        },
        toDecimal(ip: string): number {
            return ipToDecimal(ipDottedToDefault(ip));
        },
        toDefault(ip: string): IpAddressType {
            return ipDottedToDefault(ip);
        },
        toShorthand(ip: string): number {
            const ipDefault: IpAddressType = ipDottedToDefault(ip);
            const ipBinary: string = concatBinary(ipToBinary(ipDefault));

            if (!possibleShorthandValidation(ipBinary)) return -1;

            return ipBinary.split('1').length - 1;
        },
        conversionResponseApi(given: string, ip: IpAddressType): ResponseIpConversion {
            return {
                given,
                result: {
                    joined: ip.join('.'),
                    separated: ip
                }
            };
        }
    },
    binary: {
        validate(ip: string): boolean {
            return ipAddressBinaryValidation(ip);
        },
        toBinary(ip: string): IpAddresBinaryType {
            return binaryMergedToUnmerged(ip);
        },
        toDecimal(ip: string): number {
            const ipDefault: IpAddressType = ipBinaryToDefault(binaryMergedToUnmerged(ip));
            return ipToDecimal(ipDefault);
        },
        toDefault(ip: string): IpAddressType {
            return ipBinaryToDefault(binaryMergedToUnmerged(ip));
        },
        toShorthand(ip: string): number {
            const ipDefault: IpAddressType = binaryMergedToDefault(ip);
            const ipBinary: string = concatBinary(ipToBinary(ipDefault));

            if (!possibleShorthandValidation(ipBinary)) return -1;

            return ip.split('1').length - 1;
        },
        conversionResponseApi(given: string, ip: IpAddressType): ResponseIpConversion {
            return {
                given,
                result: {
                    joined: ip.join('.'),
                    separated: ip
                }
            };
        }
    },
    shorthand: {
        validate(ip: string): boolean {
            return ipShorthandValidation(Number(ip));
        },
        toBinary(ip: string): IpAddresBinaryType {
            const ipDefault = shorthandToDefault(Number(ip));
            return ipToBinary(ipDefault);
        },
        toDecimal(ip: string): number {
            const ipDefault = shorthandToDefault(Number(ip));
            return ipToDecimal(ipDefault);
        },
        toDefault(ip: string): IpAddressType {
            const ipDefault = shorthandToDefault(Number(ip));
            return ipDefault;
        },
        toShorthand(ip: string): number {
            return Number(ip);
        },
        conversionResponseApi(given: string, ipDecimal: number): ResponseIpConversion {
            return {
                given,
                result: {
                    shorthand: ipDecimal
                }
            };
        }
    }
};
