import { ResponseIpConversion } from '@/types/api.types';
import { IpAddresBinaryType, IpAddressType, IpFormatType } from '@/types/ip.types.js';
import { anyIpAddressStrategy } from '@/types/strategy.types.js';
import {
    binaryMergedToUnmerged,
    ipBinaryToDefault,
    ipDottedToDefault,
    ipToBinary,
    ipToDecimal
} from '@/utils/calculating.util.js';
import {
    ipAddressBinaryValidation,
    ipAddressDecimalValidation,
    ipAddressValidation,
    ipDecimalToDefault
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
        responseForApi(given: string, ipDecimal: number): ResponseIpConversion {
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
        responseForApi(given: string, ip: IpAddressType): ResponseIpConversion {
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
        responseForApi(given: string, ip: IpAddressType): ResponseIpConversion {
            return {
                given,
                result: {
                    joined: ip.join('.'),
                    separated: ip
                }
            };
        }
    }
};
