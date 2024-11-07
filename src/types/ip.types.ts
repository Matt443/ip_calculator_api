export type IpAddressType = Array<number>;

export type IpAddresBinaryType = Array<string>;

// export type subnetsSetting = {} & ({ subnetsHostQuantity:number} | {subnetsQuantity:number})

interface MenuItemProps {
    subnetsQuantity: number;
    subnetsHostQuantity: number;
}

export type subnetsSetting = Pick<MenuItemProps, 'subnetsHostQuantity' | 'subnetsQuantity'>;
