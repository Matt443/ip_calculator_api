import { IpAddresBinaryType, IpAddressType, RequireField } from './ip.types';

export interface ApiResponse {
    given: string;
    result: Object;
}

export type IpConversionResultType =
    | {
          joined: string;
          separated: IpAddresBinaryType | IpAddressType;
      }
    | { decimal: number };

export interface ResponseIpConversion extends ApiResponse {
    result: IpConversionResultType;
}
