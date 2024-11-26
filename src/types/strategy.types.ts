import { IpAddresBinaryType, IpAnyFormatType } from './ip.types.js';

export type anyIpAddressStrategy = {
    validate(ip: IpAnyFormatType): boolean;
    toBinary(ip: IpAnyFormatType): IpAddresBinaryType;
};
