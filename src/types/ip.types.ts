export type IpAddressType = Array<number>;

export type IpAddresBinaryType = Array<string>;

export type IpAddressDottedType = string;

interface subnetSetting {
    subnetsQuantity: number;
    subnetsHostQuantity: number;
}

export type subnetSettingType = Pick<subnetSetting, 'subnetsHostQuantity' | 'subnetsQuantity'>;

export type IpAddressInfoType = {
    ip: IpAddressType;
    binary: IpAddresBinaryType;
    decimal: number;
    dotted: string;
};

export type NetworkInfoType = {
    broadcastAddress: IpAddressInfoType;
    networkAddress: IpAddressInfoType;
    hosts: {
        first: IpAddressInfoType;
        last: IpAddressInfoType;
        quantity: number;
    };
};
