import {
    IpAddresBinaryType,
    IpAddressInfoType,
    IpAddressType,
    IpFormatType,
    NetworkInfoType
} from './ip.types.js';

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

export interface ResponseHostQuantity {
    given: { mask: string; type?: string };
    result: { hostQuantity: number };
}

export interface ResponseNetworkInfo {
    given: { ipMask: string; type?: string; maskType?: string; ip: string };
    result: NetworkInfoType;
}

export interface ResponseSubnets {
    given: { ipMask: string; type?: string; maskType?: string; ip: string };
    result: NetworkInfoType[];
}
export type ResponseTypes = ResponseIpConversion | ResponseNetworkAddress;

export type IpParamType = {
    type?: string;
    ip: string;
};

export type MaskParamType = {
    mask: string;
    maskType?: string;
};

export type IpAndMaskParamType = IpParamType & MaskParamType;

export type SubnetSettingParamType =
    | {
          subnetsQuantity: number;
      }
    | { subnetsHostQuantity: number };

export type SubnetVLSMSettingType = { hostQuantity: number[] };
export type SubnetParamType = IpAndMaskParamType & SubnetSettingParamType;

export type SubnetVLSMParamType = IpAndMaskParamType & SubnetVLSMSettingType;

export interface AllParamsType {
    ip: string;
    type: string;
    mask: string;
    maskType?: string;
    subnetsQuantity?: number;
    subnetsHostQuantity: number;
    hostQuantities: number[];
}
