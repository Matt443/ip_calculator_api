import { IpAddresBinaryType, IpAddressType, IpFormatType } from '@/types/ip.types.js';
import { anyIpAddressStrategy } from '@/types/strategy.types.js';
import { binaryMergedToUnmerged, ipDottedToDefault, ipToBinary } from '@/utils/calculating.util.js';
import {
    ipAddressBinaryValidation,
    ipAddressDecimalValidation,
    ipAddressValidation,
    ipDecimalToDefault
} from '@/utils/validation.util.js';

export const anyIp: Record<IpFormatType, anyIpAddressStrategy> = {
    decimal: {
        validate(ip: number): boolean {
            return ipAddressDecimalValidation(ip);
        },
        toBinary(ip: number): IpAddresBinaryType {
            const ipDefault: IpAddressType = ipDecimalToDefault(ip);
            return ipToBinary(ipDefault);
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
        }
    },
    binary: {
        validate(ip: string): boolean {
            return ipAddressBinaryValidation(ip);
        },
        toBinary(ip: string): IpAddresBinaryType {
            return binaryMergedToUnmerged(ip);
        }
    }
};
