import { ResponseIpConversion } from './api.types.js';
import { IpAddresBinaryType, IpAddressType, IpAnyFormatType } from './ip.types.js';

export type anyIpAddressStrategy = {
    validate(ip: string): boolean;
    toBinary(ip: string): IpAddresBinaryType;
    toDecimal(ip: string): number;
    toDefault(ip: string): IpAddressType;
    responseForApi(given: string, ip: IpAnyFormatType): ResponseIpConversion;
};
