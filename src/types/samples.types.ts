import {
    IpAndMaskParamType,
    MaskParamType,
    ResponseHostQuantity,
    ResponseIpConversion,
    ResponseNetworkAddress,
    ResponseNetworkInfo,
    ResponseSubnets,
    SubnetParamType,
    SubnetVLSMParamType
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

export type CalculationTestsFieldType =
    | (IpAndMaskParamType & {
          result: { given: IpAndMaskParamType } & { result: IpAddressInfoType };
      })
    | (IpAndMaskParamType & {
          result: number;
      });

export type CalculationTestsDataType = {
    success: CalculationTestsFieldType[];
    fail: CalculationTestsFieldType[];
};

export type TestDataSetType =
    | ConversionTestsDataType
    | CalculationTestsDataType
    | HostQuantityTestsDataType
    | NetworkInfoTestsDataType
    | SubnetTestsDataType;

export type TestDataSetFieldType =
    | IpToConvertType
    | CalculationTestsFieldType
    | HostQuantityTestFieldType
    | NetworkInfoTestsFieldType
    | SubnetTestsFieldType;

export type HostQuantityTestFieldType =
    | (MaskParamType & {
          result: { given: MaskParamType } & { result: { hostQuantity: number } };
      })
    | (MaskParamType & {
          result: number;
      });

export type HostQuantityTestsDataType = {
    success: HostQuantityTestFieldType[];
    fail: HostQuantityTestFieldType[];
};

export type NetworkInfoTestsFieldType =
    | (IpAndMaskParamType & {
          result: { given: IpAndMaskParamType } & { result: NetworkInfoType };
      })
    | (IpAndMaskParamType & {
          result: number;
      });

export type NetworkInfoTestsDataType = {
    success: NetworkInfoTestsFieldType[];
    fail: NetworkInfoTestsFieldType[];
};

export type SubnetTestsFieldType =
    | (SubnetParamType & { result: { given: SubnetParamType } & { result: NetworkInfoType[] } })
    | (any & { result: number });

export type SubnetTestsDataType = {
    success: SubnetTestsFieldType[];
    fail: SubnetTestsFieldType[];
};

export type SubnetVLSMTestsFieldType =
    | (SubnetVLSMParamType & {
          result: { given: SubnetVLSMParamType } & { result: NetworkInfoType[] };
      })
    | (any & { result: number });

export type SubnetVLSMTestsDataType = {
    success: SubnetVLSMTestsFieldType[];
    fail: SubnetVLSMTestsFieldType[];
};
