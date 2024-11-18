export type IpAddressType = Array<number>;

export type IpAddresBinaryType = Array<string>;

export type IpAddressDottedType = string;

interface subnetSetting {
    subnetsQuantity: number;
    subnetsHostQuantity: number;
}

type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;

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
        first: IpAddressInfoType;
        last: IpAddressInfoType;
        quantity: number;
    };
};
