export type IpAddressType = Array<number>;

export type IpAddresBinaryType = Array<string>;

export type IpAddressDottedType = string;

export interface subnetSetting {
    subnetsQuantity: number | undefined;
    subnetsHostQuantity: number | undefined;
}

export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type subnetSettingType = RequireField<
    subnetSetting,
    'subnetsQuantity' | 'subnetsHostQuantity'
>;

export type IpAddressInfoType = {
    ip: IpAddressType;
    binary: IpAddresBinaryType;
    decimal: number;
    dotted: string;
};

export type NetworkInfoType = {
    broadcastAddress: IpAddressInfoType;
    networkAddress: IpAddressInfoType;
    ipMask: IpAddressInfoType;
    hosts: {
        first?: IpAddressInfoType;
        last?: IpAddressInfoType;
        quantity: number;
    };
};

export type subnetSettingVLSM_Type = {
    hostQuantity: number;
    power: number;
};

export type IpAnyFormatType = number | IpAddresBinaryType | IpAddressType;

export type IpFormatType = keyof IpFormatsType;

export type IpFormatsType = {
    decimal: (ip: number | string | IpAddressType) => boolean;
    default: (ip: number | string | IpAddressType) => boolean;
    binary: (ip: number | string | IpAddressType) => boolean;
    shorthand: (ip: number | string | IpAddressType) => boolean;
};

export type IpClassType = {
    name: string;
    min: IpAddressType;
    max: IpAddressType;
    hostQuantity: number;
    defaultMask: IpAddressType;
};
