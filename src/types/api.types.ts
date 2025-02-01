import { IpAddresBinaryType, IpAddressInfoType, IpAddressType, IpFormatType } from './ip.types.js';

export interface ApiResponse {
    given: string;
    result: Object;
}

export type IpConversionResultType =
    | {
          joined: string;
          separated: IpAddresBinaryType | IpAddressType;
      }
    | { decimal: number }
    | { shorthand: number };

export interface ResponseIpConversion extends ApiResponse {
    result: IpConversionResultType;
}

export interface ResponseNetworkAddress {
    given: { ip: string; mask: string };
    result: IpAddressInfoType;
}

export type ResponseTypes = ResponseIpConversion | ResponseNetworkAddress;

export interface givenDataConversionType {
    ip?: string;
    type?: IpFormatType;
}

export interface givenDataNetworkAddressType extends givenDataConversionType {
    mask?: string;
    maskType?: string;
    responseType?: string;
}

export interface givenDataAll extends givenDataNetworkAddressType, givenDataConversionType {}
