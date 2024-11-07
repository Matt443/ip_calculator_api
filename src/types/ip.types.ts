export type IpAddressType = Array<number>;

export type IpAddresBinaryType = Array<string>;

interface subnetSetting {
    subnetsQuantity: number;
    subnetsHostQuantity: number;
}

export type subnetSettingType = Pick<subnetSetting, 'subnetsHostQuantity' | 'subnetsQuantity'>;
