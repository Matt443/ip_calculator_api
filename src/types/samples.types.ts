import {
    ResponseHostQuantity,
    ResponseIpConversion,
    ResponseNetworkAddress,
    ResponseNetworkInfo
} from './api.types.js';
import { IpAddressInfoType, IpAddressType, NetworkInfoType } from './ip.types.js';

export interface IpsToEdit {
    ip: IpAddressType;
}

export type IpToFixType = IpsToEdit & { fixed: IpAddressType };

export type IpToMoveType = IpsToEdit & { moved: IpAddressType; forwards: boolean };

export type IpToCompareType = IpsToEdit & { secondIp: IpAddressType };

export type IpToGetInfoType = IpsToEdit & { ipMask: IpAddressType; result?: NetworkInfoType };

export type IpToGetConversionsType = IpsToEdit & { result?: IpAddressInfoType };

export type ConversionTestsDataType = { success: IpToConvertType[]; fail: IpToConvertType[] };

export type IpToGetSubnetsVLSMType = IpsToEdit & {
    masks: IpAddressType[];
    results?: NetworkInfoType[];
};

export type IpToGetSubnetsType = IpsToEdit & {
    ipMask: IpAddressType;
    subnetsQuantity: number;
    result?: NetworkInfoType[];
    error?: string;
};

export type dataSetType = {
    ipBinary: string;
    maskDecimal: number;
    filler: string;
    expected: number;
};

export type IpToConvertType = {
    ip: string;
    type: string;
    result: ResponseIpConversion | number;
};

export type IpToCalculateType = {
    ip: string;
    type?: string;
    mask: string;
    maskType?: string;
    result: ResponseNetworkAddress | number;
};

export type CalculationTestsDataType = { success: IpToCalculateType[]; fail: IpToCalculateType[] };

export type TestDataSetType =
    | ConversionTestsDataType
    | CalculationTestsDataType
    | HostQuantityTestsDataType
    | NetworkInfoTestsDataType;

export type TestDataSetFieldType =
    | IpToCalculateType
    | IpToConvertType
    | IpToGetHostQuantityType
    | IpToGetNetworkInfoType;

export type IpToGetHostQuantityType = {
    type?: string;
    mask: string;
    result: ResponseHostQuantity | number;
};

export type HostQuantityTestsDataType = {
    success: IpToGetHostQuantityType[];
    fail: IpToGetHostQuantityType[];
};

export type IpToGetNetworkInfoType = {
    type?: string;
    mask: string;
    ip: string;
    maskType?: string;
    result: ResponseNetworkInfo | number;
};

export type NetworkInfoTestsDataType = {
    success: IpToGetNetworkInfoType[];
    fail: IpToGetNetworkInfoType[];
};
