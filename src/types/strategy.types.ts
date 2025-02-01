import { ResponseTypes } from './api.types.js';
import {
    IpAddresBinaryType,
    IpAddressInfoType,
    IpAddressType,
    IpAnyFormatType
} from './ip.types.js';

export type anyIpAddressStrategy = {
    validate(ip: string): boolean;
    toBinary(ip: string): IpAddresBinaryType;
    toDecimal(ip: string): number;
    toDefault(ip: string): IpAddressType;
    toShorthand(ip: string): number;
    conversionResponseApi(given: string, ip: IpAnyFormatType): ResponseTypes;
};
